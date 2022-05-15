import { ExchangeClient } from "..";
import { C_Currency, C_Security, C_Operation } from "../../types";
import { IExchangeClientRef, IExchangeInfo } from "../interfaces";

const securitiesCache = new Map<string, C_Security>()

export class InfoModule implements IExchangeInfo, IExchangeClientRef {
  private readonly _exchangeClient: ExchangeClient

  constructor(exchangeClient: ExchangeClient){
    this._exchangeClient = exchangeClient
  }

  get exchangeClient(): ExchangeClient {
    return this._exchangeClient
  }

  async getCurrencies(): Promise<C_Currency[]> {
    const currencies: C_Currency[] = [ 'CHF', "CNY", 'EUR', "GBP", "HKD", "JPY", "RUB", "TRY", "USD" ]
    return currencies
  }

  async getSecurityLastPrice(ticker: string): Promise<number> {
    const security = await this.getSecurity(ticker, true)
    const orderBook = await this.exchangeClient.api.orderbookGet({ figi: security?.figi || '' })
    return orderBook?.lastPrice || 0
  }

  async getSecurityCurrency(ticker: string): Promise<C_Currency> {
    const security = await this.getSecurity(ticker)
    return security?.currency || 'USD'
  }

  async getSecurityName(ticker: string): Promise<string> {
    const security = await this.getSecurity(ticker)
    return security?.name || ''
  }

  async getSecurityOperations(ticker: string, from: Date = new Date(0), to: Date = new Date()): Promise<C_Operation[]> {
    const security = await this.getSecurity(ticker)
    const operations = await this._exchangeClient.api.operations({
      from: from.toISOString(),
      to: to.toISOString(),
      figi: security?.figi
    })
    return operations.operations
  }

  private async getSecurity(ticker: string, ignoreCache: boolean = false): Promise<C_Security> {
    if (!securitiesCache.has(ticker) || ignoreCache){
      const security = await this.exchangeClient.api.searchOne({ ticker })
      if (!security) throw new Error(`Security with ticker "${ticker} was not found"`)
      securitiesCache.set(ticker, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(ticker)
  }
}
