import { GetCurrencyType, GetSecurityType } from '../domain/extractors'
import { IInfoModule } from './IInfoModule'
import { IExchangeClient } from './IExchangeClient'
import { DomainTemplate } from 'src/domain'

export abstract class AbstractInfoModule<Domain extends DomainTemplate, TExchangeApi = unknown>
  implements IInfoModule<Domain>
{
  protected exchangeClient: IExchangeClient<Domain, TExchangeApi>

  setExchangeClient(exchangeClient: IExchangeClient<Domain, TExchangeApi>) {
    this.exchangeClient = exchangeClient
  }

  abstract getCurrencies(): Promise<GetCurrencyType<Domain>[]>

  abstract getSecurityLastPrice(ticker: string): Promise<number>

  abstract getSecurityCurrency(ticker: string): Promise<GetCurrencyType<Domain>>

  abstract getSecurityName(ticker: string): Promise<string>

  abstract getSecurity(ticker: string, ignoreCache?: boolean): Promise<GetSecurityType<Domain> | null>

  abstract getSecurityByExchangeId(id: string, ignoreCache?: boolean): Promise<GetSecurityType<Domain> | null>
}
