import { IExchangeConnector } from 'src/connector'
import { OrderStatus, OperationType } from '../models'
import { CommonDomain } from '../CommonDomain'
import { DomainTemplate } from '../DomainTemplate'
import {
  GetCurrencyType,
  GetCurrencyBalanceType,
  GetSecurityBalanceType,
  GetSecurityType,
  GetOrderType
} from '../extractors'
import { IDomainMapper } from '../mapper'

export abstract class AbstractDomainMapper<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements IDomainMapper<Domain>
{
  protected exchangeClient: IExchangeConnector<Domain, TExchangeApi>

  setExchangeClient(exchangeClient: IExchangeConnector<Domain, TExchangeApi>) {
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
