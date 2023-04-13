import { AbstractExchangeClient } from './AbstractExchangeClient'
import { GetCurrencyType, GetSecurityType, GetDomain } from '../domain/extractors'
import { IInfoModule } from './IInfoModule'

export abstract class AbstractInfoModule<
  ExchangeClient extends AbstractExchangeClient
> implements IInfoModule<GetDomain<ExchangeClient>> {
  protected exchangeClient: ExchangeClient

  setExchangeClient(exchangeClient: ExchangeClient) {
    this.exchangeClient = exchangeClient
  }

  abstract getCurrencies(): Promise<GetCurrencyType<ExchangeClient>[]>

  abstract getSecurityLastPrice(ticker: string): Promise<number>

  abstract getSecurityCurrency(
    ticker: string
  ): Promise<GetCurrencyType<ExchangeClient>>

  abstract getSecurityName(ticker: string): Promise<string>

  abstract getSecurity(
    ticker: string,
    ignoreCache?: boolean
  ): Promise<GetSecurityType<ExchangeClient> | null>

  abstract getSecurityByExchangeId(
    id: string,
    ignoreCache?: boolean
  ): Promise<GetSecurityType<ExchangeClient> | null>
}
