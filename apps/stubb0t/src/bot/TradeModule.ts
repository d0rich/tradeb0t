import { AbstractTradeModule, CommonDomain, CreateOrderOptions, Order } from '@tradeb0t/core'
import { StubExchangeApi } from '../exchange'

export class TradeModule extends AbstractTradeModule<CommonDomain, StubExchangeApi> {
  sell(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeConnector.api.sell(options)
  }
  buy(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeConnector.api.buy(options)
  }
  marketSell(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeConnector.api.marketSell(options)
  }
  marketBuy(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeConnector.api.marketBuy(options)
  }
  sellOrCancel(): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  buyOrCancel(): Promise<Order> {
    throw new Error('Method not implemented.')
  }
}
