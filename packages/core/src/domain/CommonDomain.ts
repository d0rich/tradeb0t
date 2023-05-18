import { DomainTemplate } from './DomainTemplate'
import { Currency, CurrencyBalance, SecurityBalance, Security, Order } from 'src/domain'

export type CommonDomain = DomainTemplate<Currency, CurrencyBalance, Security, SecurityBalance, Order>
