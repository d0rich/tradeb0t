import { DomainTemplate } from '../domain'
import { GetSecurityBalanceType, GetCurrencyBalanceType } from 'src/domain/extractors'
import { ITradeModule } from './ITradeModule'
import { IInfoModule } from './IInfoModule'
import { IDomainMapper } from './IDomainMapper'

export interface IExchangeClient<Domain extends DomainTemplate, TExchangeApi = unknown> {
  get api(): TExchangeApi
  get tradeModule(): ITradeModule<Domain>
  get infoModule(): IInfoModule<Domain>
  get domainMapper(): IDomainMapper<Domain>

  getPortfolio(): Promise<GetSecurityBalanceType<Domain>[]>
  getCurrenciesBalance(): Promise<GetCurrencyBalanceType<Domain>[]>
}
