import { IExchangeConnector } from './connector'
import { DomainTemplate } from './domain'
import { ApiService, AuthService, IExchangeAnalyzer, IExchangeTrader, IExchangeWatcher, LoggerService } from './modules'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITradeBot<Domain extends DomainTemplate = any, TExchangeApi = any> {
  get exchangeClient(): IExchangeConnector<Domain, TExchangeApi>
  get analyzer(): IExchangeAnalyzer<Domain, TExchangeApi>
  get trader(): IExchangeTrader
  get watcher(): IExchangeWatcher<Domain>
  get api(): ApiService
  get logger(): LoggerService
  get auth(): AuthService
}
