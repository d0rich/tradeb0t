import { DomainTemplate, GetOrderType } from 'src/domain'
import { CreateOrderOptions } from 'src/api/trpc/schemas'

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
