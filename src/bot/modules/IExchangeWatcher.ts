import {
  CommonDomain,
  DomainTemplate,
  GetSecurityBalanceType,
  GetCurrencyBalanceType,
  GetCurrencyType,
  GetSecurityType,
  GetOrderType
} from 'src/domain'
import { OperationType, OrderStatus } from '../../db'

export interface IExchangeWatcher<Domain extends DomainTemplate> {
  getPortfolio(): Promise<GetSecurityBalanceType<CommonDomain>[]>
  getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>>
  getSecurityName(ticker: string): Promise<string>
  getSecurityLastPrice(ticker: string): Promise<number>
  getSecurityCurrency(ticker: string): Promise<GetCurrencyType<CommonDomain>>

  // TODO: implament with Hookable
  onOrderSent(order: GetOrderType<Domain>, operation_type: OperationType, runId?: number): OrderStatus
}
