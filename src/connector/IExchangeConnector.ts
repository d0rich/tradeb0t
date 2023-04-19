import { DomainTemplate, StubDomain, GetSecurityBalanceType, GetCurrencyBalanceType, IDomainMapper } from 'src/domain'
import { ITradeModule } from './ITradeModule'
import { IInfoModule } from './IInfoModule'

export interface IExchangeConnector<Domain extends DomainTemplate = StubDomain, TExchangeApi = unknown> {
  get api(): TExchangeApi
  get tradeModule(): ITradeModule<Domain>
  get infoModule(): IInfoModule<Domain>
  get domainMapper(): IDomainMapper<Domain>

  initAccount(): Promise<void> | void
  getPortfolio(): Promise<GetSecurityBalanceType<Domain>[]>
  getCurrenciesBalance(): Promise<GetCurrencyBalanceType<Domain>[]>
}
