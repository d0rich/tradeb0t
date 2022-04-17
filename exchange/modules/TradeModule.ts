import { ExchangeClient } from "..";
import { OrderDetails } from "../../types";
import { R_PlacedOrder } from "../../types/ExchangeApi.t";
import { IExchangeClientRef, IExchangeTrade } from "../interfaces";

export class TradeModule implements IExchangeTrade, IExchangeClientRef {
  private readonly _exchangeApi: ExchangeClient

  constructor(exchangeApi: ExchangeClient){
    this._exchangeApi = exchangeApi
  }

  get exchangeClient(): ExchangeClient {
    return this._exchangeApi
  }

  public async sell({ ticker, lots, price }: OrderDetails): Promise<R_PlacedOrder> {
    // @ts-ignore
    const { figi } = await this.exchangeClient.api.searchOne({ ticker });
    const placedOrder = await this.exchangeClient.api.limitOrder({figi, operation: 'Sell', lots, price})
    return placedOrder
  }

  public async buy({ ticker, lots, price }: OrderDetails): Promise<R_PlacedOrder> {
    // @ts-ignore
    const { figi } = await this.exchangeClient.api.searchOne({ ticker });
    const placedOrder = await this.exchangeClient.api.limitOrder({figi, operation: 'Buy', lots, price})
    return placedOrder
  }

  public async sellOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
  public async buyOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}