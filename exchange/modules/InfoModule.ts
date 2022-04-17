import { Portfolio } from "@tinkoff/invest-openapi-js-sdk";
import { ExchangeClient } from "..";
import { IExchangeClientRef, IExchangeInfo } from "../interfaces";

export class InfoModule implements IExchangeInfo, IExchangeClientRef {
  private readonly _exchangeClient: ExchangeClient

  constructor(exchangeClient: ExchangeClient){
    this._exchangeClient = exchangeClient
  }

  get exchangeClient(): ExchangeClient {
    return this._exchangeClient
  }

  async portfolio(): Promise<Portfolio> {
      return await this.exchangeClient.api.portfolio()
  }
}