import { AbstractExchangeClient } from '../abstract'
import { DomainTemplate } from './DomainTemplate'

export type GetDomain<ExchangeClient extends AbstractExchangeClient> = ExchangeClient extends AbstractExchangeClient<
  infer Domain
>
  ? Domain
  : never

export type GetExchangeApiType<ExchangeClient> = ExchangeClient extends AbstractExchangeClient
  ? ExchangeClient['api']
  : never

export type GetCurrencyBalanceType<T> = T extends AbstractExchangeClient<infer Domain>
  ? Domain['currencyBalance']
  : T extends DomainTemplate
  ? T['currencyBalance']
  : never

export type GetCurrencyType<T> = T extends AbstractExchangeClient<infer Domain>
  ? Domain['currency']
  : T extends DomainTemplate
  ? T['currency']
  : never

export type GetOrderType<T> = T extends AbstractExchangeClient<infer Domain>
  ? Domain['order']
  : T extends DomainTemplate
  ? T['order']
  : never

export type GetPortfolioPositionType<T> = T extends AbstractExchangeClient<infer Domain>
  ? Domain['securityBalance'] | Domain['currencyBalance']
  : T extends DomainTemplate
  ? T['securityBalance'] | T['currencyBalance']
  : never

export type GetSecurityType<T> = T extends AbstractExchangeClient<infer Domain>
  ? Domain['security']
  : T extends DomainTemplate
  ? T['security']
  : never

export type GetSecurityBalanceType<T> = T extends AbstractExchangeClient<infer Domain>
  ? Domain['securityBalance']
  : T extends DomainTemplate
  ? T['securityBalance']
  : never
