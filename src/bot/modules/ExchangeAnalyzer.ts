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
    await Promise.all([this.storage.algorithms.save(this.tradeAlgos.description)])
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
  async updateCurrencies(): Promise<GetCurrencyType<CommonDomain>[]> {
    const relevantCurrencies = await this.watcher.getCurrencies()
    await this.storage.currencies.updateAll(relevantCurrencies)
    return this.storage.currencies.find()
  }

  @HandleError()
  async updateCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]> {
    const relevantCurrencies = await this.watcher.getCurrenciesBalance()
    await this.storage.portfolio.currencies.upsert(relevantCurrencies, {
      conflictPaths: {
        assetTicker: true
      }
    })
    return this.storage.portfolio.currencies.find()
  }

  @HandleError()
  async updateSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    const securities: GetSecurityType<CommonDomain>[] = await this.storage.securities.find()
    return this.updateSecuritiesList(securities)
  }

  @HandleError()
  async updateFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]> {
    const securitiesToUpdate = await this.storage.securities.findAllFollowed()
    return this.updateSecuritiesList(securitiesToUpdate)
  }

  @HandleError()
  async updatePortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]> {
    const { watcher } = this
    const relevantPortfolio = await watcher.getPortfolio()
    const securities = await Promise.all(relevantPortfolio.map((p) => watcher.getSecurity(p.assetTicker)))
    const currencies = await watcher.getCurrenciesBalance()
    await this.storage.securities.updateAll(...securities)
    await Promise.all([
      this.storage.portfolio.securities.upsert(relevantPortfolio, {
        conflictPaths: {
          assetTicker: true
        }
      }),
      this.storage.portfolio.currencies.upsert(currencies, {
        conflictPaths: {
          assetTicker: true
        }
      })
    ])
    return this.storage.portfolio.findPositions()
  }

  @HandleError()
  private async loadSecurityIfNotExist(ticker: string): Promise<GetSecurityType<CommonDomain> | null> {
    const { watcher } = this
    const securityInCache = await this.storage.securities.findByTicker(ticker)
    if (!securityInCache) {
      await this.storage.securities.save(await watcher.getSecurity(ticker))
      return await this.storage.securities.findByTicker(ticker)
    }
    return securityInCache
  }

  @HandleError()
  private async loadSecuritiesIfNotExist(tickers: string[]): Promise<GetSecurityType<CommonDomain>[]> {
    const { watcher } = this
    const securitiesInCache = await this.storage.securities.findByTickers(tickers)
    const securitiesToAdd = await Promise.all(
      tickers.filter((t) => !securitiesInCache.some((s) => s.ticker === t)).map((ticker) => watcher.getSecurity(ticker))
    )
    await this.storage.securities.upsert(securitiesToAdd, {
      conflictPaths: {
        ticker: true
      }
    })
    return await this.storage.securities.find()
  }

  @HandleError()
  private async updateSecuritiesList(securitiesToUpdate: GetSecurityType<CommonDomain>[]) {
    const updatedSecurities = await Promise.all(
      securitiesToUpdate.map(async (security) => {
        security.price = await this.watcher.getSecurityLastPrice(security.ticker)
        return security
      })
    )
    await this.storage.securities.updateAll(...updatedSecurities)
    return this.storage.securities.find()
  }
}
