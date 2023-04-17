import { StubExchangeState } from "./State"
import { Currency, CurrencyBalance, Security, SecurityBalance, Order } from 'src/domain'

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
}
