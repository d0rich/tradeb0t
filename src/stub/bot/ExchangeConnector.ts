import { AbstractExchangeConnector, CommonDomain, CurrencyBalance, SecurityBalance } from 'src'
import { StubExchangeApi } from '../exchange'

export class ExchangeConnector extends AbstractExchangeConnector<CommonDomain, StubExchangeApi> {
  protected initAccount() {
    console.log('Account initialized')
  }
  getPortfolio(): Promise<SecurityBalance[]> {
    throw new Error('Method not implemented.')
  }
  getCurrenciesBalance(): Promise<CurrencyBalance[]> {
    throw new Error('Method not implemented.')
  }
}
