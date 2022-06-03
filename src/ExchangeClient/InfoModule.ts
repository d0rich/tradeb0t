import { ExchangeClient } from "./ExchangeClient";
import { C_Currency, C_Security, C_Operation } from "../exchangeClientTypes";
import {AbstractInfoModule} from "../../lib/modules";

const securitiesCache = new Map<string, C_Security>()

export class InfoModule extends AbstractInfoModule{

  constructor(exchangeClient: ExchangeClient){
    super(exchangeClient)
  }

  async getCurrencies(): Promise<C_Currency[]> {
    const currencies: C_Currency[] = [ 'CHF', "CNY", 'EUR', "GBP", "HKD", "JPY", "RUB", "TRY", "USD" ]
    return currencies
  }

  async getSecurityLastPrice(ticker: string): Promise<number> {
    const { exchangeClient } = this
    const security = await this.getSecurity(ticker, true)
    const orderBook = await exchangeClient.api.orderbookGet({ figi: security?.figi || '' })
    return orderBook?.lastPrice || 0
  }

  async getSecurityCurrency(ticker: string): Promise<C_Currency> {
    const { getSecurity } = this
    const security = await getSecurity(ticker)
    if (!security) throw new Error(`Security with ticker "${ticker}" was not found`)
    if (!security.currency) throw new Error(`Security with ticker "${ticker}" has no currency`)
    return security.currency
  }

  async getSecurityName(ticker: string): Promise<string> {
    const { getSecurity } = this
    const security = await getSecurity(ticker)
    return security?.name || ''
  }

  async getSecurity(ticker: string, ignoreCache: boolean = false): Promise<C_Security | null> {
    const { exchangeClient } = this
    if (!securitiesCache.has(ticker) || ignoreCache){
      const security = await exchangeClient.api.searchOne({ ticker })
      if (!security) return null
      securitiesCache.set(ticker, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(ticker)
  }

  async getSecurityByExchangeId(id: string, ignoreCache: boolean = false): Promise<C_Security | null>{
    const { exchangeClient } = this
    if (!securitiesCache.has(id) || ignoreCache){
      const security = await exchangeClient.api.searchOne({ figi: id })
      if (!security) return null
      securitiesCache.set(id, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(id)
  }
}
