import { AbstractExchangeClient } from './AbstractExchangeClient'
import { GetOrderType, GetDomain } from '../domain/extractors'
import { CreateOrderOptions } from './CreateOrderOptions'
import { ITradeModule } from './ITradeModule'

export abstract class AbstractTradeModule<ExchangeClient extends AbstractExchangeClient>
  implements ITradeModule<GetDomain<ExchangeClient>>
{
  protected exchangeClient: ExchangeClient

  setExchangeClient(exchangeClient: ExchangeClient) {
    this.exchangeClient = exchangeClient
  }

  abstract sell({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<ExchangeClient>>

  abstract buy({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<ExchangeClient>>

  abstract marketSell({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<ExchangeClient>>

  abstract marketBuy({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<ExchangeClient>>

  abstract sellOrCancel(): Promise<GetOrderType<ExchangeClient>>

  abstract buyOrCancel(): Promise<GetOrderType<ExchangeClient>>
}
