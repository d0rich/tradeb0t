import { AbstractTradeModule, CommonDomain, CreateOrderOptions, Order } from 'src'
import { StubExchangeApi } from '../exchange'

export class TradeModule extends AbstractTradeModule<CommonDomain, StubExchangeApi> {
  sell({ ticker, lots, price }: CreateOrderOptions): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  buy({ ticker, lots, price }: CreateOrderOptions): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  marketSell({ ticker, lots }: CreateOrderOptions): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  marketBuy({ ticker, lots }: CreateOrderOptions): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  sellOrCancel(): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  buyOrCancel(): Promise<Order> {
    throw new Error('Method not implemented.')
  }
}
