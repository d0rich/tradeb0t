import { ExchangeApi } from "..";
import { IExchangeApiRef, IExchangeInfo } from "../interfaces";

export class InfoModule implements IExchangeInfo, IExchangeApiRef {
  private readonly _exchangeApi: ExchangeApi

  constructor(exchangeApi: ExchangeApi){
    this._exchangeApi = exchangeApi
  }

  get exchangeApi(): ExchangeApi {
    return this._exchangeApi
  }
}