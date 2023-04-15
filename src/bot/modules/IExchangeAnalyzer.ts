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
  get trader(): IExchangeTrader
  get watcher(): IExchangeWatcher<Domain>
  start(): Promise<void>
  updateCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  updateCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  updateSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  getSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>>
  addSecurities(...securities: GetSecurityType<CommonDomain>[]): Promise<GetSecurityType<CommonDomain>[]>
  getFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  followSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined>
  unfollowSecurity(securityTicker: string): Promise<GetSecurityType<CommonDomain> | undefined>
  updateFollowedSecurities(): Promise<GetSecurityType<CommonDomain>[]>
  updatePortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]>
  getPortfolio(): Promise<GetPortfolioPositionType<CommonDomain>[]>
  clearPortfolio(): Promise<number>
}
