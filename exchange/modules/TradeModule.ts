import { ExchangeApi } from "..";
import { IExchangeApiRef, IExchangeTrade } from "../interfaces";

export class TradeModule implements IExchangeTrade, IExchangeApiRef {
  private readonly _exchangeApi: ExchangeApi

  constructor(exchangeApi: ExchangeApi){
    this._exchangeApi = exchangeApi
  }

  get exchangeApi(): ExchangeApi {
    return this._exchangeApi
  }

  sell(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  buy(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  sellOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
  buyOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}