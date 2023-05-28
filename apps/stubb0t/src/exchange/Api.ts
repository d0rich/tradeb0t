import { StubExchangeState } from './State'
import { Currency, CurrencyBalance, Security, SecurityBalance, Order, CreateOrderOptions } from '@tradeb0t/core'
import { faker } from '@faker-js/faker'

export class StubExchangeApi {
  state = new StubExchangeState()
  isInitialized = false

  async initialize() {
    await this.state.initialize()
    this.isInitialized = true
  }

  getPortfolio(): Promise<SecurityBalance[]> {
    return this.state.db.manager.find(SecurityBalance)
  }

  getCurrenciesBalance(): Promise<CurrencyBalance[]> {
    return this.state.db.manager.find(CurrencyBalance)
  }

  getCurrencies(): Promise<Currency[]> {
    return this.state.db.manager.find(Currency)
  }

  async getSecurityLastPrice(ticker: string): Promise<number> {
    const security = await this.state.db.manager.findOneBy(Security, { ticker })
    if (!security) {
      throw new Error(`Security with ticker ${ticker} not found`)
    }
    return security.price
  }

  async getSecurityCurrency(ticker: string): Promise<Currency> {
    const security = await this.state.db.manager.findOne(Security, {
      where: { ticker },
      relations: {
        currency: true
      }
    })
    if (!security) {
      throw new Error(`Security with ticker ${ticker} not found`)
    }
    return security.currency
  }

  async getSecurityName(ticker: string): Promise<string> {
    const security = await this.state.db.manager.findOneBy(Security, { ticker })
    if (!security) {
      throw new Error(`Security with ticker ${ticker} not found`)
    }
    return security.name
  }

  getSecurity(ticker: string): Promise<Security | null> {
    return this.state.db.manager.findOneBy(Security, { ticker })
  }

  sell(options: CreateOrderOptions): Promise<Order> {
    const order = new Order()
    order.operation = 'limit_sell'
    order.price = options.price
    order.lots = options.lots
    order.securityTicker = options.ticker
    order.exchangeId = faker.random.alphaNumeric(10)
    order.status = 'placed'
    order.algorithmRunId = 1
    return this.state.db.manager.save(order)
  }
  buy(options: CreateOrderOptions): Promise<Order> {
    const order = new Order()
    order.operation = 'limit_buy'
    order.price = options.price
    order.lots = options.lots
    order.securityTicker = options.ticker
    order.exchangeId = faker.random.alphaNumeric(10)
    order.status = 'placed'
    order.algorithmRunId = 1
    return this.state.db.manager.save(order)
  }
  marketSell(options: CreateOrderOptions): Promise<Order> {
    const order = new Order()
    order.operation = 'market_sell'
    order.price = options.price
    order.lots = options.lots
    order.securityTicker = options.ticker
    order.exchangeId = faker.random.alphaNumeric(10)
    order.status = 'placed'
    order.algorithmRunId = 1
    return this.state.db.manager.save(order)
  }
  marketBuy(options: CreateOrderOptions): Promise<Order> {
    const order = new Order()
    order.operation = 'market_buy'
    order.price = options.price
    order.lots = options.lots
    order.securityTicker = options.ticker
    order.exchangeId = faker.random.alphaNumeric(10)
    order.status = 'placed'
    order.algorithmRunId = 1
    return this.state.db.manager.save(order)
  }
}
