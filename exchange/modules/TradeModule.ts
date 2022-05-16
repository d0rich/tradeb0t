import { ExchangeClient } from "..";
import { OrderDetails } from "../../types";
import { C_Order } from "../../types/ExchangeApi.t";
import { IExchangeTrade } from "../interfaces";

export class TradeModule implements IExchangeTrade {
  private readonly exchangeClient: ExchangeClient

  constructor(exchangeApi: ExchangeClient){
    this.exchangeClient = exchangeApi
  }

  public async sell({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    // @ts-ignore
    const { figi } = await this.exchangeClient.api.searchOne({ ticker });
    const placedOrder = await this.exchangeClient.api.limitOrder({figi, operation: 'Sell', lots, price})
    return placedOrder
  }

  public async buy({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    // @ts-ignore
    const { figi } = await this.exchangeClient.api.searchOne({ ticker });
    const placedOrder = await this.exchangeClient.api.limitOrder({figi, operation: 'Buy', lots, price})
    return placedOrder
  }

  public async sellOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

  public async buyOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

}
