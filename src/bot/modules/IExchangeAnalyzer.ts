import { DomainTemplate } from 'src/domain'
import { IExchangeTrader } from './IExchangeTrader'
import { IExchangeWatcher } from './IExchangeWatcher'
import {
  GetCurrencyType,
  CommonDomain,
  GetCurrencyBalanceType,
  GetSecurityType,
  GetPortfolioPositionType
} from 'src/domain'
import { ITradeBot } from 'src/bot/ITradeBot'
import { ITradeAlgorithmsEngine } from 'src/algorithms'
import { IInMemoryStorage, IPersistentStorage } from 'src/storage'

export interface IExchangeAnalyzer<Domain extends DomainTemplate, TExchangeApi> {
  readonly tradeAlgos: ITradeAlgorithmsEngine
  readonly storage: IPersistentStorage & IInMemoryStorage
  readonly tradebot: ITradeBot<Domain, TExchangeApi>
  get trader(): IExchangeTrader<Domain>
  get watcher(): IExchangeWatcher
  start(): Promise<void>
  updateCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  updateCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  updateSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  updateFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  updatePortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]>
}
