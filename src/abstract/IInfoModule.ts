import { DomainTemplate } from "src/domain"
import { GetSecurityBalanceType, GetCurrencyType } from "src/domain/extractors"

export interface IInfoModule<Domain extends DomainTemplate> {
  getCurrencies(): Promise<GetCurrencyType<Domain>[]>
  getSecurityLastPrice(ticker: string): Promise<number>
  getSecurityCurrency(ticker: string): Promise<GetCurrencyType<Domain>>
  getSecurityName(ticker: string): Promise<string>
  getSecurity(ticker: string, ignoreCache?: boolean): Promise<GetSecurityBalanceType<Domain> | null>
  getSecurityByExchangeId(id: string, ignoreCache?: boolean): Promise<GetSecurityBalanceType<Domain> | null>
}
