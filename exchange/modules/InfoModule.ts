import { ExchangeClient } from "..";
import { IExchangeClientRef, IExchangeInfo } from "../interfaces";

export class InfoModule implements IExchangeInfo, IExchangeClientRef {
  private readonly _exchangeApi: ExchangeClient

  constructor(exchangeApi: ExchangeClient){
    this._exchangeApi = exchangeApi
  }

  get exchangeApi(): ExchangeClient {
    return this._exchangeApi
  }
}