import { AbstractExchangeConnector, CommonDomain, CurrencyBalance, SecurityBalance } from 'src'
import { StubExchangeApi } from '../exchange'

export class ExchangeConnector extends AbstractExchangeConnector<CommonDomain, StubExchangeApi> {
  protected initAccount() {
    console.log('Account initialized')
  }
  getPortfolio(): Promise<SecurityBalance[]> {
    return this.api.getPortfolio()
  }
  getCurrenciesBalance(): Promise<CurrencyBalance[]> {
    return this.api.getCurrenciesBalance()
  }
}
