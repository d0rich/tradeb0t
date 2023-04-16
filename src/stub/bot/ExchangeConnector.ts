import { AbstractExchangeConnector, CommonDomain, CurrencyBalance, SecurityBalance } from 'src'

export class ExchangeConnector extends AbstractExchangeConnector<CommonDomain> {
  protected initAccount(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  getPortfolio(): Promise<SecurityBalance[]> {
    throw new Error('Method not implemented.')
  }
  getCurrenciesBalance(): Promise<CurrencyBalance[]> {
    throw new Error('Method not implemented.')
  }
}
