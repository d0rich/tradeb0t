import { AbstractTradeModule, CommonDomain, CreateOrderOptions, Order } from 'src'
import { StubExchangeApi } from '../exchange'

export class TradeModule extends AbstractTradeModule<CommonDomain, StubExchangeApi> {
  sell(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeClient.api.sell(options)
  }
  buy(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeClient.api.buy(options)
  }
  marketSell(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeClient.api.marketSell(options)
  }
  marketBuy(options: CreateOrderOptions): Promise<Order> {
    return this.exchangeClient.api.marketBuy(options)
  }
  sellOrCancel(): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  buyOrCancel(): Promise<Order> {
    throw new Error('Method not implemented.')
  }
}
