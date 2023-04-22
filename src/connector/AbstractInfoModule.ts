import { GetCurrencyType, GetSecurityType, DomainTemplate } from 'src/domain'
import { IInfoModule } from './IInfoModule'
import { IExchangeConnector } from './IExchangeConnector'

export abstract class AbstractInfoModule<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements IInfoModule<Domain>
{
  protected exchangeConnector: IExchangeConnector<Domain, TExchangeApi>

  setExchangeClient(exchangeConnector: IExchangeConnector<Domain, TExchangeApi>) {
    this.exchangeConnector = exchangeConnector
  }

  abstract getCurrencies(): Promise<GetCurrencyType<Domain>[]>

  abstract getSecurityLastPrice(ticker: string): Promise<number>

  abstract getSecurityCurrency(ticker: string): Promise<GetCurrencyType<Domain>>

  abstract getSecurityName(ticker: string): Promise<string>

  abstract getSecurity(ticker: string, ignoreCache?: boolean): Promise<GetSecurityType<Domain> | null>

  abstract getSecurityByExchangeId(id: string, ignoreCache?: boolean): Promise<GetSecurityType<Domain> | null>
}
