import { IExchangeConnector } from '../connector'
import { DomainTemplate } from '../domain'
import { IExchangeAnalyzer, IExchangeTrader, IExchangeWatcher } from './modules'
import { ApiService, AuthService, LoggerService } from './services'
import { ITradeBotConfig } from './ITradeBotConfig'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITradeBot<Domain extends DomainTemplate = any, TExchangeApi = any> {
  readonly config: ITradeBotConfig

  get exchangeConnector(): IExchangeConnector<Domain, TExchangeApi>
  get analyzer(): IExchangeAnalyzer<Domain, TExchangeApi>
  get trader(): IExchangeTrader
  get watcher(): IExchangeWatcher
  get api(): ApiService
  get logger(): LoggerService
  get auth(): AuthService
}
