import { ExchangeClient } from "../../ExchangeClient";
import { OrderDetails } from "../../utils/orderDetails";
import { C_Order } from "../../../config/exchangeClientTypes";
import { IExchangeTrade } from "../../interfaces/ExchangeClient";

export class TradeModule implements IExchangeTrade {
  private readonly exchangeClient: ExchangeClient

  constructor(exchangeApi: ExchangeClient){
    this.exchangeClient = exchangeApi
  }

  public async sell({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    const { exchangeClient } = this
    // @ts-ignore
    const { figi } = await exchangeClient.api.searchOne({ ticker });
    const placedOrder = await exchangeClient.api.limitOrder({figi, operation: 'Sell', lots, price})
    return placedOrder
  }

  public async buy({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    const { exchangeClient } = this
    // @ts-ignore
    const { figi } = await exchangeClient.api.searchOne({ ticker });
    const placedOrder = await exchangeClient.api.limitOrder({figi, operation: 'Buy', lots, price})
    return placedOrder
  }

  public async sellOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

  public async buyOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

}
