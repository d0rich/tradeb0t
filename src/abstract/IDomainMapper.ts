import { DomainTemplate, CommonDomain } from 'src/domain'
import { OrderStatus, OperationType } from '../db'
import { GetCurrencyType, GetOrderType, GetSecurityType } from 'src/domain/extractors'

export interface IDomainMapper<Domain extends DomainTemplate> {
  currency(currency: GetCurrencyType<Domain>): Promise<GetCurrencyType<CommonDomain>>
  currencyBalance(currency: GetCurrencyType<Domain>): Promise<GetCurrencyType<CommonDomain>>
  security(security: GetSecurityType<Domain>): Promise<GetSecurityType<CommonDomain>>
  securityBalance(security: GetSecurityType<Domain>): Promise<GetSecurityType<CommonDomain>>
  order(order: GetOrderType<Domain>): Promise<GetOrderType<CommonDomain>>
  orderStatus(order: GetOrderType<Domain>): OrderStatus
  orderOperation(order: GetOrderType<Domain>): OperationType
}
