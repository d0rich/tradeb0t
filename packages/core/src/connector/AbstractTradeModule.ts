import { IExchangeConnector } from './IExchangeConnector'
import { GetOrderType, DomainTemplate } from 'src/domain'
import { CreateOrderOptions } from 'src/api/trpc/schemas'
import { ITradeModule } from './ITradeModule'

export abstract class AbstractTradeModule<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements ITradeModule<Domain>
{
  protected exchangeConnector: IExchangeConnector<Domain, TExchangeApi>

  setExchangeConnector(exchangeConnector: IExchangeConnector<Domain, TExchangeApi>) {
    this.exchangeConnector = exchangeConnector
  }

  abstract sell({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract buy({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract marketSell({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract marketBuy({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract sellOrCancel(): Promise<GetOrderType<Domain>>

  abstract buyOrCancel(): Promise<GetOrderType<Domain>>
}
