import { AbstractInfoModule, CommonDomain, Currency, Security } from 'src'

export class InfoModule extends AbstractInfoModule<CommonDomain> {
  getCurrencies(): Promise<Currency[]> {
    throw new Error('Method not implemented.')
  }
  getSecurityLastPrice(ticker: string): Promise<number> {
    throw new Error('Method not implemented.')
  }
  getSecurityCurrency(ticker: string): Promise<Currency> {
    throw new Error('Method not implemented.')
  }
  getSecurityName(ticker: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
  getSecurity(ticker: string, ignoreCache?: boolean | undefined): Promise<Security | null> {
    throw new Error('Method not implemented.')
  }
  getSecurityByExchangeId(id: string, ignoreCache?: boolean | undefined): Promise<Security | null> {
    throw new Error('Method not implemented.')
  }
}
