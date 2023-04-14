import { DomainTemplate, CommonDomain, StubDomain, OrderStatus, OperationType } from 'src/domain'
import {
  GetCurrencyType,
  GetOrderType,
  GetSecurityType,
  GetCurrencyBalanceType,
  GetSecurityBalanceType
} from 'src/domain/extractors'

export interface IDomainMapper<Domain extends DomainTemplate = StubDomain> {
  currency(currency: GetCurrencyType<Domain>): Promise<GetCurrencyType<CommonDomain>>
  currencyBalance(currency: GetCurrencyBalanceType<Domain>): Promise<GetCurrencyBalanceType<CommonDomain>>
  security(security: GetSecurityType<Domain>): Promise<GetSecurityType<CommonDomain>>
  securityBalance(security: GetSecurityBalanceType<Domain>): Promise<GetSecurityBalanceType<CommonDomain>>
  order(order: GetOrderType<Domain>): Promise<GetOrderType<CommonDomain>>
  orderStatus(order: GetOrderType<Domain>): OrderStatus
  orderOperation(order: GetOrderType<Domain>): OperationType
}
