import { scheduleJob } from 'node-schedule'
import { In, Not } from 'typeorm'
import { OperationType, Algorithm, AlgorithmRun, Order, AlgorithmRunStatus } from 'src/domain/models'
import { GetOrdersOptions } from '../../api/trpc/schemas'
import {
  GetSecurityType,
  GetCurrencyType,
  GetCurrencyBalanceType,
  GetOrderType,
  GetPortfolioPositionType,
  CommonDomain,
  DomainTemplate
} from 'src/domain'
import { ITradeAlgorithm, ITradeAlgorithmsEngine, TradeAlgorithmsEngine } from 'src/algorithms'
import { PersistentStorage, db } from 'src/storage/persistent'
import { store } from 'src/storage'
import { HandleError } from '../../decorators'
import { IExchangeAnalyzer } from './IExchangeAnalyzer'
import { IExchangeTrader } from './IExchangeTrader'
import { IExchangeWatcher } from './IExchangeWatcher'
import { ITradeBot } from 'src/bot'
export class ExchangeAnalyzer<Domain extends DomainTemplate, TExchangeApi>
  implements IExchangeAnalyzer<Domain, TExchangeApi>
{
  readonly tradeAlgos: ITradeAlgorithmsEngine
  // FIXME: generate unique id
  readonly persistentStorage = new PersistentStorage('id')
  readonly tradebot: ITradeBot<Domain, TExchangeApi>
  get trader(): IExchangeTrader {
    return this.tradebot.trader
  }
  get watcher(): IExchangeWatcher<Domain> {
    return this.tradebot.watcher
  }

  constructor(
    tradebot: ITradeBot<Domain, TExchangeApi>,
    initAlgorithmsCallback: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[] = () => []
  ) {
    this.tradebot = tradebot
    this.tradeAlgos = new TradeAlgorithmsEngine<Domain, TExchangeApi>(this, initAlgorithmsCallback)
  }

  @HandleError()
  async start() {
    await Promise.all([
      this.persistentStorage
        .algorithmsRepository
        .save(this.tradeAlgos.description),
      this.initUpdaters()
    ])
  }

  @HandleError()
  private async initUpdaters() {
    scheduleJob('updateBalance', '*/1 * * * *', () => {
      this.updateCurrenciesBalance()
    })
    scheduleJob('updatePortfolio', '*/1 * * * *', () => {
      this.updatePortfolio()
    })
    scheduleJob('updateFollowedSecurities', '*/1 * * * *', () => {
      this.updateFollowedSecurities()
    })
  }

  @HandleError()
  private async loadSecurityIfNotExist(ticker: string): Promise<GetSecurityType<CommonDomain> | undefined> {
    const { watcher } = this
    const securityInCache = store.securitiesStore.securities.find((s) => s.ticker === ticker)
    if (!securityInCache) {
      await this.addSecurities(await watcher.getSecurity(ticker))
      return store.securitiesStore.securities.find((s) => s.ticker === ticker)
    }
    return securityInCache
  }

  @HandleError()
  private async loadSecuritiesIfNotExist(tickers: string[]): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securitiesInCache = store.securitiesStore.securities.filter((s) => tickers.includes(s.ticker))
    const securitiesToAdd = await Promise.all(
      tickers.filter((t) => !securitiesInCache.some((s) => s.ticker === t)).map((ticker) => watcher.getSecurity(ticker))
    )
    return this.addSecurities(...securitiesToAdd)
  }

  // Currencies

  @HandleError()
  async updateCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    const relevantCurrencies = await this.watcher.getCurrencies()
    store.currenciesStore.updateCurrenciesAll(relevantCurrencies)
    return store.currenciesStore.currencies
  }

  @HandleError()
  async getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    return store.currenciesStore.currencies
  }

  // Currencies Balance

  @HandleError()
  async updateCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    const { watcher } = this
    const relevantCurrencies = await watcher.getCurrenciesBalance()
    store.portfolioStore.updatePositions(...relevantCurrencies)
    return store.portfolioStore.currencies
  }

  @HandleError()
  async getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    return store.portfolioStore.currencies
  }

  // Securities

  @HandleError()
  async updateSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securities: GetSecurityType<CommonDomain>[] = store.securitiesStore.securities
    const securitiesPrices = await Promise.all(
      securities.map((security): Promise<number> => watcher.getSecurityLastPrice(security.ticker))
    )
    store.securitiesStore.updateSecurities(
      ...securities.map((security, index) => ({
        ...security,
        price: securitiesPrices[index]
      }))
    )
    return store.securitiesStore.securities
  }

  @HandleError()
  async getSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    return store.securitiesStore.securities
  }

  @HandleError()
  async getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>> {
    const security = store.securitiesStore.securities.find((s) => s.ticker === ticker)
    if (!security) throw new Error(`Security with ticker:${ticker} was not found`)
    return security
  }

  @HandleError()
  async addSecurities(...securities: GetSecurityType<CommonDomain>[]): Promise<GetSecurityType<CommonDomain>[]> {
    store.securitiesStore.updateSecurities(...securities)
    return store.securitiesStore.securities
  }

  // Followed Securities

  @HandleError()
  async getFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    return store.securitiesStore.followedSecurities
  }

  @HandleError()
  async followSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined> {
    return store.securitiesStore.follow(securityTicker)
  }

  @HandleError()
  async unfollowSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined> {
    return store.securitiesStore.unfollow(securityTicker)
  }

  @HandleError()
  async updateFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securitiesToUpdate = store.securitiesStore.followedSecurities
    const securitiesPrices = await Promise.all(
      securitiesToUpdate.map((security) => watcher.getSecurityLastPrice(security.ticker))
    )
    store.securitiesStore.updateSecurities(
      ...securitiesToUpdate.map((s, index) => ({
        ...s,
        price: securitiesPrices[index]
      }))
    )
    return store.securitiesStore.followedSecurities
  }

  // Portfolio

  @HandleError()
  async updatePortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]> {
    const { watcher } = this
    const relevantPortfolio = await watcher.getPortfolio()
    const securities = await Promise.all(relevantPortfolio.map((p) => watcher.getSecurity(p.securityTicker)))
    const currencies = await watcher.getCurrenciesBalance()
    await this.addSecurities(...securities)
    store.portfolioStore.updatePositionsAll([...relevantPortfolio, ...currencies])
    return store.portfolioStore.portfolio
  }

  @HandleError()
  async getPortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]> {
    return store.portfolioStore.portfolio
  }

  @HandleError()
  async clearPortfolio(): Promise<number> {
    const deleted = store.portfolioStore.portfolio.length
    store.portfolioStore.updatePositionsAll([])
    return deleted
  }

  // Orders

  @HandleError()
  async saveOrder(
    order: GetOrderType<CommonDomain>,
    operation: OperationType,
    runId?: number
  ): Promise<GetOrderType<CommonDomain>> {
    await this.loadSecurityIfNotExist(order.securityTicker)
    await db.manager.upsert(
      Order,
      {
        ...order,
        operation,
        algorithmRunId: runId
      },
      {
        conflictPaths: ['exchangeId']
      }
    )
    const result = await db.manager.findOneBy(Order, {
      exchangeId: order.exchangeId
    })
    if (!result) throw new Error(`Order was not saved successfully: ${order}`)
    return result
  }

  @HandleError()
  async getOrders({
    from,
    to,
    operation,
    securityTicker,
    runId
  }: GetOrdersOptions): Promise<GetOrderType<CommonDomain>[]> {
    // TODO: Rewrite to typed selector
    let queryBuilder = db.manager
      .getRepository(Order)
      .createQueryBuilder('order')
      .where('order.updatedAt > :from', { from: Number(from ?? 0) })
      .andWhere('order.updatedAt < :to', { from: Number(to ?? new Date()) })
    if (operation)
      queryBuilder = queryBuilder.andWhere('order.operation = :operation', {
        operation
      })
    if (securityTicker)
      queryBuilder = queryBuilder.andWhere('order.securityTicker = :securityTicker', { securityTicker })
    if (runId)
      queryBuilder = queryBuilder.andWhere('order.algorithmRunId = :runId', {
        runId
      })
    return await queryBuilder.getMany()
  }

  // Algorithms

  @HandleError()
  async runAlgorithm(algorithmName: string, inputs: unknown, state: unknown = inputs): Promise<AlgorithmRun> {
    return db.manager.create(AlgorithmRun, {
      algorithmName,
      inputs,
      state,
      status: 'running'
    })
  }

  @HandleError()
  async saveAlgorithmRunProgress(id: number, state: unknown): Promise<AlgorithmRun> {
    if (!state) throw new Error('State is required')
    await db.manager.update(AlgorithmRun, { id }, { state })
    const updatedRun = await db.manager.findOneBy(AlgorithmRun, { id })
    if (!updatedRun) throw new Error(`AlgorithmRun wasn't updated successfully: ${{ id, state }}`)
    return updatedRun
  }

  @HandleError()
  async loadAlgorithmRunProgress(id: number): Promise<AlgorithmRun | null> {
    return db.manager.findOneBy(AlgorithmRun, { id })
  }

  @HandleError()
  async stopAlgorithmRun(id: number): Promise<AlgorithmRun> {
    await db.manager.update(AlgorithmRun, { id }, { status: 'stopped' })
    const stoppedRun = await db.manager.findOneBy(AlgorithmRun, { id })
    if (!stoppedRun) throw new Error(`AlgorithmRun wasn't stopped successfully: ${{ id }}`)
    return stoppedRun
  }

  @HandleError()
  async resumeAlgorithmRun(id: number): Promise<AlgorithmRun> {
    await db.manager.update(AlgorithmRun, { id }, { status: 'resumed' })
    const resumedRun = await db.manager.findOneBy(AlgorithmRun, { id })
    if (!resumedRun) throw new Error(`AlgorithmRun wasn't resumed successfully: ${{ id }}`)
    return resumedRun
  }

  @HandleError()
  async finishAlgorithmRun(id: number): Promise<AlgorithmRun> {
    await db.manager.update(AlgorithmRun, { id }, { status: 'finished' })
    const finishedRun = await db.manager.findOneBy(AlgorithmRun, { id })
    if (!finishedRun) throw new Error(`AlgorithmRun wasn't finished successfully: ${{ id }}`)
    return finishedRun
  }

  @HandleError()
  async errorAlgorithmRun(id: number, error: Error): Promise<AlgorithmRun> {
    const run = await db.manager.findOneBy(AlgorithmRun, { id })
    const state = { stateBeforeError: run?.state, error }
    await db.manager.update(
      AlgorithmRun,
      { id },
      {
        status: 'error',
        state
      }
    )
    const runWithError = await db.manager.findOneBy(AlgorithmRun, { id })
    if (!runWithError) throw new Error(`Error in AlgorithmRun wasn't saved successfully: ${{ id }}`)
    return runWithError
  }

  @HandleError()
  async getAlgorithmRunsByAlgorithm(algorithmName: string): Promise<AlgorithmRun[]> {
    return db.manager.find(AlgorithmRun, {
      where: { algorithmName },
      order: { id: 'DESC' }
    })
  }

  @HandleError()
  async getUnfinishedAlgorithmRuns(): Promise<AlgorithmRun[]> {
    return db.manager.find(AlgorithmRun, {
      where: {
        status: Not(In<AlgorithmRunStatus>(['finished', 'stopped', 'error']))
      }
    })
  }
}
