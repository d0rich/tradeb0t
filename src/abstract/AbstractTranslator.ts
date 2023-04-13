import { AbstractExchangeClient } from './AbstractExchangeClient'
import { OrderStatus, OperationType } from '../db'
import { CommonDomain } from '../domain'
import {
  GetCurrencyType,
  GetCurrencyBalanceType,
  GetSecurityBalanceType,
  GetSecurityType,
  GetOrderType
} from '../domain/extractors'

export abstract class AbstractTranslator<
  ExchangeClient extends AbstractExchangeClient = AbstractExchangeClient
> {
  protected exchangeClient: ExchangeClient

  setExchangeClient(exchangeClient: ExchangeClient) {
    this.exchangeClient = exchangeClient
  }

  abstract currency(
    currency: GetCurrencyType<ExchangeClient>
  ): Promise<GetCurrencyType<CommonDomain>>

  abstract currencyBalance(
    currency: GetCurrencyBalanceType<ExchangeClient>
  ): Promise<GetCurrencyBalanceType<CommonDomain>>

  abstract security(
    security: GetSecurityType<ExchangeClient>
  ): Promise<GetSecurityType<CommonDomain>>

  abstract securityBalance(
    portfolio: GetSecurityBalanceType<ExchangeClient>
  ): Promise<GetSecurityBalanceType<CommonDomain>>

  abstract order(
    order: GetOrderType<ExchangeClient>
  ): Promise<GetOrderType<CommonDomain>>

  abstract orderStatus(order: GetOrderType<ExchangeClient>): OrderStatus

  abstract orderOperation(order: GetOrderType<ExchangeClient>): OperationType
}
