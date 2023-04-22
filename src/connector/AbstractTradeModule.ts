import { IExchangeConnector } from './IExchangeConnector'
import { GetOrderType, CreateOrderOptions, DomainTemplate } from 'src/domain'
import { ITradeModule } from './ITradeModule'

export abstract class AbstractTradeModule<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements ITradeModule<Domain>
{
  protected exchangeConnector: IExchangeConnector<Domain, TExchangeApi>

  setExchangeClient(exchangeConnector: IExchangeConnector<Domain, TExchangeApi>) {
    this.exchangeConnector = exchangeConnector
  }

  abstract sell({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract buy({ ticker, lots, price }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract marketSell({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract marketBuy({ ticker, lots }: CreateOrderOptions): Promise<GetOrderType<Domain>>

  abstract sellOrCancel(): Promise<GetOrderType<Domain>>

  abstract buyOrCancel(): Promise<GetOrderType<Domain>>
}
