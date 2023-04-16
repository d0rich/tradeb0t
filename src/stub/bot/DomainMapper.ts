import {
  AbstractDomainMapper,
  CommonDomain,
  Currency,
  CurrencyBalance,
  Order,
  OrderStatus,
  Security,
  SecurityBalance
} from 'src'

export class DomainMapper extends AbstractDomainMapper<CommonDomain> {
  async currency(currency: Currency): Promise<Currency> {
    return currency
  }

  async currencyBalance(currencyBalance: CurrencyBalance): Promise<CurrencyBalance> {
    return currencyBalance
  }

  async security(security: Security): Promise<Security> {
    return security
  }

  async securityBalance(portfolio: SecurityBalance): Promise<SecurityBalance> {
    return portfolio
  }

  async order(order: Order): Promise<Order> {
    return order
  }

  orderOperation(
    order: Order
  ): 'undefined' | 'limit_buy' | 'limit_sell' | 'market_buy' | 'market_sell' | 'buy_or_cancel' | 'sell_or_cancel' {
    return order.operation
  }

  orderStatus(order: Order): OrderStatus {
    return order.status
  }
}
