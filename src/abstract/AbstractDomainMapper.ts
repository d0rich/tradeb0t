import { IExchangeClient } from './IExchangeClient'
import { OrderStatus, OperationType } from '../db'
import { CommonDomain, DomainTemplate } from '../domain'
import {
  GetCurrencyType,
  GetCurrencyBalanceType,
  GetSecurityBalanceType,
  GetSecurityType,
  GetOrderType,
  GetDomain
} from '../domain/extractors'
import { IDomainMapper } from './IDomainMapper'

export abstract class AbstractDomainMapper<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements IDomainMapper<Domain>
{
  protected exchangeClient: IExchangeClient<Domain, TExchangeApi>

  setExchangeClient(exchangeClient: IExchangeClient<Domain, TExchangeApi>) {
    this.exchangeClient = exchangeClient
  }

  abstract currency(currency: GetCurrencyType<Domain>): Promise<GetCurrencyType<CommonDomain>>

  abstract currencyBalance(currency: GetCurrencyBalanceType<Domain>): Promise<GetCurrencyBalanceType<CommonDomain>>

  abstract security(security: GetSecurityType<Domain>): Promise<GetSecurityType<CommonDomain>>

  abstract securityBalance(portfolio: GetSecurityBalanceType<Domain>): Promise<GetSecurityBalanceType<CommonDomain>>

  abstract order(order: GetOrderType<Domain>): Promise<GetOrderType<CommonDomain>>

  abstract orderStatus(order: GetOrderType<Domain>): OrderStatus

  abstract orderOperation(order: GetOrderType<Domain>): OperationType
}
