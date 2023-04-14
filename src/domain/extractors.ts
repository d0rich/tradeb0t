import { AbstractExchangeConnector } from '../connector'
import { DomainTemplate } from './DomainTemplate'

export type GetDomain<ExchangeClient extends AbstractExchangeConnector> =
  ExchangeClient extends AbstractExchangeConnector<infer Domain> ? Domain : never

export type GetExchangeApiType<ExchangeClient> = ExchangeClient extends AbstractExchangeConnector
  ? ExchangeClient['api']
  : never

export type GetCurrencyBalanceType<T> = T extends AbstractExchangeConnector<infer Domain>
  ? Domain['currencyBalance']
  : T extends DomainTemplate
  ? T['currencyBalance']
  : never

export type GetCurrencyType<T> = T extends AbstractExchangeConnector<infer Domain>
  ? Domain['currency']
  : T extends DomainTemplate
  ? T['currency']
  : never

export type GetOrderType<T> = T extends AbstractExchangeConnector<infer Domain>
  ? Domain['order']
  : T extends DomainTemplate
  ? T['order']
  : never

export type GetPortfolioPositionType<T> = T extends AbstractExchangeConnector<infer Domain>
  ? Domain['securityBalance'] | Domain['currencyBalance']
  : T extends DomainTemplate
  ? T['securityBalance'] | T['currencyBalance']
  : never

export type GetSecurityType<T> = T extends AbstractExchangeConnector<infer Domain>
  ? Domain['security']
  : T extends DomainTemplate
  ? T['security']
  : never

export type GetSecurityBalanceType<T> = T extends AbstractExchangeConnector<infer Domain>
  ? Domain['securityBalance']
  : T extends DomainTemplate
  ? T['securityBalance']
  : never
