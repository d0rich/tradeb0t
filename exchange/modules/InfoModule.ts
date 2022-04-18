import { Portfolio } from "@tinkoff/invest-openapi-js-sdk";
import { ExchangeClient } from "..";
import { C_Currency } from "../../types";
import { IExchangeClientRef, IExchangeInfo } from "../interfaces";

export class InfoModule implements IExchangeInfo, IExchangeClientRef {
  private readonly _exchangeClient: ExchangeClient

  constructor(exchangeClient: ExchangeClient){
    this._exchangeClient = exchangeClient
  }

  get exchangeClient(): ExchangeClient {
    return this._exchangeClient
  }

  async currencies(): Promise<C_Currency[]> {
    const currencies: C_Currency[] = [ 'CHF', "CNY", 'EUR', "GBP", "HKD", "JPY", "RUB", "TRY", "USD" ]
    return currencies
  }

  async securityLastPrice(ticker: string): Promise<number> {
    const security = await this.exchangeClient.api.searchOne({ ticker })
    if (!security) throw new Error(`Security with ticker "${ticker} was not found"`)
    const orderBook = await this.exchangeClient.api.orderbookGet({ figi: security?.figi || '' })
    return orderBook?.lastPrice || 0
  }

  async securityCurrency(ticker: string): Promise<C_Currency> {
    const security = await this.exchangeClient.api.searchOne({ ticker })
    if (!security) throw new Error(`Security with ticker "${ticker} was not found"`)
    return security?.currency || 'USD'
  }
}