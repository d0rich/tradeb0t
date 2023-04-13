import { DomainTemplate } from 'src/domain'
import { CreateOrderOptions } from './CreateOrderOptions'
import { GetOrderType } from 'src/domain/extractors'

export interface ITradeModule<Domain extends DomainTemplate> {
  sell(options: CreateOrderOptions): Promise<GetOrderType<Domain>>
  buy(options: CreateOrderOptions): Promise<GetOrderType<Domain>>
  marketSell(options: CreateOrderOptions): Promise<GetOrderType<Domain>>
  marketBuy(options: CreateOrderOptions): Promise<GetOrderType<Domain>>
  /**
   * @ignore
   */
  sellOrCancel(): Promise<GetOrderType<Domain>>
  /**
   * @ignore
   */
  buyOrCancel(): Promise<GetOrderType<Domain>>
}
