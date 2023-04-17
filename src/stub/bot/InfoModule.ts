import { AbstractInfoModule, CommonDomain, Currency, Security } from 'src'
import { StubExchangeApi } from '../exchange'

export class InfoModule extends AbstractInfoModule<CommonDomain, StubExchangeApi> {
  getCurrencies(): Promise<Currency[]> {
    return this.exchangeClient.api.getCurrencies()
  }
  getSecurityLastPrice(ticker: string): Promise<number> {
    return this.exchangeClient.api.getSecurityLastPrice(ticker)
  }
  getSecurityCurrency(ticker: string): Promise<Currency> {
    return this.exchangeClient.api.getSecurityCurrency(ticker)
  }
  getSecurityName(ticker: string): Promise<string> {
    return this.exchangeClient.api.getSecurityName(ticker)
  }
  getSecurity(ticker: string, ignoreCache?: boolean | undefined): Promise<Security | null> {
    return this.exchangeClient.api.getSecurity(ticker)
  }
  getSecurityByExchangeId(id: string, ignoreCache?: boolean | undefined): Promise<Security | null> {
    throw new Error('Method not implemented.')
  }
}
