import { PlacedLimitOrder } from "@tinkoff/invest-openapi-js-sdk";
import { ExchangeApi } from "..";
import { OrderDetails } from "../../types";
import { IExchangeApiRef, IExchangeTrade } from "../interfaces";

export class TradeModule implements IExchangeTrade, IExchangeApiRef {
  private readonly _exchangeApi: ExchangeApi

  constructor(exchangeApi: ExchangeApi){
    this._exchangeApi = exchangeApi
  }

  get exchangeApi(): ExchangeApi {
    return this._exchangeApi
  }

  public async sell({ ticker, lots, price }: OrderDetails): Promise<PlacedLimitOrder> {
    // @ts-ignore
    const { figi } = await this.exchangeApi.api.searchOne({ ticker });
    const placedOrder = await this.exchangeApi.api.limitOrder({figi, operation: 'Sell', lots, price})
    return placedOrder
  }

  public async buy({ ticker, lots, price }: OrderDetails): Promise<PlacedLimitOrder> {
    // @ts-ignore
    const { figi } = await this.exchangeApi.api.searchOne({ ticker });
    const placedOrder = await this.exchangeApi.api.limitOrder({figi, operation: 'Buy', lots, price})
    return placedOrder
  }

  public async sellOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
  public async buyOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}