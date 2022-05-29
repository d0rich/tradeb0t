import { ExchangeClient } from "..";
import { C_Currency, C_Instrument, C_Operation } from "../../types";
import { IExchangeInfo } from "../interfaces";

const securitiesCache = new Map<string, C_Instrument>()

export class InfoModule implements IExchangeInfo {
  private readonly exchangeClient: ExchangeClient

  constructor(exchangeClient: ExchangeClient){
    this.exchangeClient = exchangeClient
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

  async getOperationsAll(from: Date = new Date(0), to: Date = new Date()): Promise<C_Operation[]> {
    const { exchangeClient } = this
    const operations = await exchangeClient.api.operations({
      from: from.toISOString(),
      to: to.toISOString()
    })
    return operations.operations
  }

  async getOperationsByInstrument(ticker: string, from: Date = new Date(0), to: Date = new Date()): Promise<C_Operation[]> {
    const { exchangeClient } = this
    const security = await this.getInstrument(ticker)
    const operations = await exchangeClient.api.operations({
      from: from.toISOString(),
      to: to.toISOString(),
      figi: security?.figi
    })
    return operations.operations
  }

  async getInstrument(ticker: string, ignoreCache: boolean = false): Promise<C_Instrument> {
    const { exchangeClient } = this
    if (!securitiesCache.has(ticker) || ignoreCache){
      const security = await exchangeClient.api.searchOne({ ticker })
      if (!security) throw new Error(`Instrument with ticker "${ticker} was not found"`)
      securitiesCache.set(ticker, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(ticker)
  }

  async getInstrumentByExchangeId(id: string, ignoreCache: boolean = false): Promise<C_Instrument>{
    const { exchangeClient } = this
    if (!securitiesCache.has(id) || ignoreCache){
      const security = await exchangeClient.api.searchOne({ figi: id })
      if (!security) throw new Error(`Instrument with id "${id} was not found"`)
      securitiesCache.set(id, security)
      return security
    }
    // @ts-ignore
    return securitiesCache.get(ticker)
  }
}
