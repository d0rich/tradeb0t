import { AbstractExchangeConnector, CommonDomain, CurrencyBalance, SecurityBalance } from 'src'
import { StubExchangeApi } from '../exchange'

export class ExchangeConnector extends AbstractExchangeConnector<CommonDomain, StubExchangeApi> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initAccount() {}
  getPortfolio(): Promise<SecurityBalance[]> {
    return this.api.getPortfolio()
  }
  getCurrenciesBalance(): Promise<CurrencyBalance[]> {
    return this.api.getCurrenciesBalance()
  }
}
