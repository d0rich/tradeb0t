import { ExchangeClient } from "./ExchangeClient";
import { C_Currency, C_Instrument, C_Operation } from "../exchangeClientTypes";
import {AbstractInfoModule} from "../../lib/modules";

const securitiesCache = new Map<string, C_Instrument>()

export class InfoModule extends AbstractInfoModule{

  constructor(exchangeClient: ExchangeClient){
    super(exchangeClient)
  }

  async getCurrencies(): Promise<C_Currency[]> {
    const currencies: C_Currency[] = [ 'CHF', "CNY", 'EUR', "GBP", "HKD", "JPY", "RUB", "TRY", "USD" ]
    return currencies
  }

  async getInstrumentLastPrice(ticker: string): Promise<number> {
    const { exchangeClient } = this
    const security = await this.getInstrument(ticker, true)
    const orderBook = await exchangeClient.api.orderbookGet({ figi: security?.figi || '' })
    return orderBook?.lastPrice || 0
  }

  async getInstrumentCurrency(ticker: string): Promise<C_Currency> {
    const { getInstrument } = this
    const security = await getInstrument(ticker)
    return security?.currency || 'USD'
  }

  async getInstrumentName(ticker: string): Promise<string> {
    const { getInstrument } = this
    const security = await getInstrument(ticker)
    return security?.name || ''
  }

  async getInstrument(ticker: string, ignoreCache: boolean = false): Promise<C_Instrument | null> {
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

  async getInstrumentByExchangeId(id: string, ignoreCache: boolean = false): Promise<C_Instrument | null>{
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
