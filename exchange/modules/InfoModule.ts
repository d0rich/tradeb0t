import { ExchangeClient } from "..";
import { C_Currency, C_Security, C_Operation } from "../../types";
import { IExchangeInfo } from "../interfaces";

const securitiesCache = new Map<string, C_Security>()

export class InfoModule implements IExchangeInfo {
  private readonly exchangeClient: ExchangeClient

  constructor(exchangeClient: ExchangeClient){
    this.exchangeClient = exchangeClient
  }

  async getCurrencies(): Promise<C_Currency[]> {
    const currencies: C_Currency[] = [ 'CHF', "CNY", 'EUR', "GBP", "HKD", "JPY", "RUB", "TRY", "USD" ]
    return currencies
  }

  async getSecurityLastPrice(ticker: string): Promise<number> {
    const { exchangeClient, getSecurity } = this
    const security = await getSecurity(ticker, true)
    const orderBook = await exchangeClient.api.orderbookGet({ figi: security?.figi || '' })
    return orderBook?.lastPrice || 0
  }

  async getSecurityCurrency(ticker: string): Promise<C_Currency> {
    const { getSecurity } = this
    const security = await getSecurity(ticker)
    return security?.currency || 'USD'
  }

  async getSecurityName(ticker: string): Promise<string> {
    const { getSecurity } = this
    const security = await getSecurity(ticker)
    return security?.name || ''
  }

  async getOperationsAll(from: Date = new Date(0), to: Date = new Date()): Promise<C_Operation[]> {
    const { exchangeClient } = this
    const operations = await exchangeClient.api.operations({
      from: from.toISOString(),
      to: to.toISOString()
    })
    return operations.operations
  }

  async getOperationsBySecurity(ticker: string, from: Date = new Date(0), to: Date = new Date()): Promise<C_Operation[]> {
    const { exchangeClient, getSecurity } = this
    const security = await getSecurity(ticker)
    const operations = await exchangeClient.api.operations({
      from: from.toISOString(),
      to: to.toISOString(),
      figi: security?.figi
    })
    return operations.operations
  }

  async getSecurity(ticker: string, ignoreCache: boolean = false): Promise<C_Security> {
    const { exchangeClient } = this
    if (!securitiesCache.has(ticker) || ignoreCache){
      const security = await exchangeClient.api.searchOne({ ticker })
      if (!security) throw new Error(`Security with ticker "${ticker} was not found"`)
      securitiesCache.set(ticker, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(ticker)
  }

  async getSecurityByExchangeId(id: string, ignoreCache: boolean = false): Promise<C_Security>{
    const { exchangeClient } = this
    if (!securitiesCache.has(id) || ignoreCache){
      const security = await exchangeClient.api.searchOne({ figi: id })
      if (!security) throw new Error(`Security with id "${id} was not found"`)
      securitiesCache.set(id, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(ticker)
  }
}
