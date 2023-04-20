import {
  CommonDomain,
  DomainTemplate,
  GetSecurityBalanceType,
  GetCurrencyBalanceType,
  GetCurrencyType,
  GetSecurityType
} from 'src/domain'

export interface IExchangeWatcher {
  getPortfolio(): Promise<GetSecurityBalanceType<CommonDomain>[]>
  getCurrenciesBalance(): Promise<GetCurrencyBalanceType<CommonDomain>[]>
  getCurrencies(): Promise<GetCurrencyType<CommonDomain>[]>
  getSecurity(ticker: string): Promise<GetSecurityType<CommonDomain>>
  getSecurityName(ticker: string): Promise<string>
  getSecurityLastPrice(ticker: string): Promise<number>
  getSecurityCurrency(ticker: string): Promise<GetCurrencyType<CommonDomain>>
}
