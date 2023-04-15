import { scheduleJob } from 'node-schedule'
import {
  GetSecurityType,
  GetCurrencyType,
  GetCurrencyBalanceType,
  GetPortfolioPositionType,
  CommonDomain,
  DomainTemplate
} from 'src/domain'
import { ITradeAlgorithm, ITradeAlgorithmsEngine, TradeAlgorithmsEngine } from 'src/algorithms'
import { UnitedStorage } from 'src/storage'
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
  readonly storage = new UnitedStorage('id')
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
    await Promise.all([this.storage.algorithms.save(this.tradeAlgos.description), this.initUpdaters()])
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
    const securityInCache = this.storage.securities.securities.find((s) => s.ticker === ticker)
    if (!securityInCache) {
      await this.addSecurities(await watcher.getSecurity(ticker))
      return this.storage.securities.securities.find((s) => s.ticker === ticker)
    }
    return securityInCache
  }

  @HandleError()
  private async loadSecuritiesIfNotExist(tickers: string[]): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securitiesInCache = this.storage.securities.securities.filter((s) => tickers.includes(s.ticker))
    const securitiesToAdd = await Promise.all(
      tickers.filter((t) => !securitiesInCache.some((s) => s.ticker === t)).map((ticker) => watcher.getSecurity(ticker))
    )
    return this.addSecurities(...securitiesToAdd)
  }

  // Currencies

  @HandleError()
  async updateCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    const relevantCurrencies = await this.watcher.getCurrencies()
    this.storage.currencies.updateCurrenciesAll(relevantCurrencies)
    return this.storage.currencies.currencies
  }

  @HandleError()
  async getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    return this.storage.currencies.currencies
  }

  // Currencies Balance

  @HandleError()
  async updateCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    const { watcher } = this
    const relevantCurrencies = await watcher.getCurrenciesBalance()
    this.storage.portfolio.updatePositions(...relevantCurrencies)
    return this.storage.portfolio.currencies
  }

  @HandleError()
  async getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    return this.storage.portfolio.currencies
  }

  // Securities

  @HandleError()
  async updateSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securities: GetSecurityType<CommonDomain>[] = this.storage.securities.securities
    const securitiesPrices = await Promise.all(
      securities.map((security): Promise<number> => watcher.getSecurityLastPrice(security.ticker))
    )
    this.storage.securities.updateSecurities(
      ...securities.map((security, index) => ({
        ...security,
        price: securitiesPrices[index]
      }))
    )
    return this.storage.securities.securities
  }

  @HandleError()
  async getSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    return this.storage.securities.securities
  }

  @HandleError()
  async getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>> {
    const security = this.storage.securities.securities.find((s) => s.ticker === ticker)
    if (!security) throw new Error(`Security with ticker:${ticker} was not found`)
    return security
  }

  @HandleError()
  async addSecurities(...securities: GetSecurityType<CommonDomain>[]): Promise<GetSecurityType<CommonDomain>[]> {
    this.storage.securities.updateSecurities(...securities)
    return this.storage.securities.securities
  }

  // Followed Securities

  @HandleError()
  async getFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    return this.storage.securities.followedSecurities
  }

  @HandleError()
  async followSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined> {
    return this.storage.securities.follow(securityTicker)
  }

  @HandleError()
  async unfollowSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined> {
    return this.storage.securities.unfollow(securityTicker)
  }

  @HandleError()
  async updateFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securitiesToUpdate = this.storage.securities.followedSecurities
    const securitiesPrices = await Promise.all(
      securitiesToUpdate.map((security) => watcher.getSecurityLastPrice(security.ticker))
    )
    this.storage.securities.updateSecurities(
      ...securitiesToUpdate.map((s, index) => ({
        ...s,
        price: securitiesPrices[index]
      }))
    )
    return this.storage.securities.followedSecurities
  }

  // Portfolio

  @HandleError()
  async updatePortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]> {
    const { watcher } = this
    const relevantPortfolio = await watcher.getPortfolio()
    const securities = await Promise.all(relevantPortfolio.map((p) => watcher.getSecurity(p.securityTicker)))
    const currencies = await watcher.getCurrenciesBalance()
    await this.addSecurities(...securities)
    this.storage.portfolio.updatePositionsAll([...relevantPortfolio, ...currencies])
    return this.storage.portfolio.portfolio
  }

  @HandleError()
  async getPortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]> {
    return this.storage.portfolio.portfolio
  }

  @HandleError()
  async clearPortfolio(): Promise<number> {
    const deleted = this.storage.portfolio.portfolio.length
    this.storage.portfolio.updatePositionsAll([])
    return deleted
  }
}
