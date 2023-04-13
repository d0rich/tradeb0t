import { IExchangeClient } from './IExchangeClient'
import { GetOrderType } from '../domain/extractors'
import { CreateOrderOptions } from './CreateOrderOptions'
import { ITradeModule } from './ITradeModule'
import { DomainTemplate } from 'src/domain'

export abstract class AbstractTradeModule<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements ITradeModule<Domain>
{
  protected exchangeClient: IExchangeClient<Domain, TExchangeApi>

  setExchangeClient(exchangeClient: IExchangeClient<Domain, TExchangeApi>) {
    this.exchangeClient = exchangeClient
  }

  abstract sell({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract buy({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract marketSell({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract marketBuy({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract sellOrCancel(): Promise<GetOrderType<Domain>>

  abstract buyOrCancel(): Promise<GetOrderType<Domain>>
}
