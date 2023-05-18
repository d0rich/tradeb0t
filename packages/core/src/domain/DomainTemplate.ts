export type DomainTemplate<
  TCurrency = unknown,
  TCurrencyBalance = unknown,
  TSecurity = unknown,
  TSecurityBalance = unknown,
  TOrder = unknown
> = {
  currency: TCurrency
  currencyBalance: TCurrencyBalance
  security: TSecurity
  securityBalance: TSecurityBalance
  order: TOrder
}
