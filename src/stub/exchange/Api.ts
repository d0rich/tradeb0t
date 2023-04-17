import { StubExchangeState } from "./State"
import { Currency, CurrencyBalance, Security, SecurityBalance, Order } from 'src/domain'

export class StubExchangeApi {
  state = new StubExchangeState()
  isInitialized = false

  getPortfolio(): Promise<SecurityBalance[]> {
    return this.state.db.manager.find(SecurityBalance)
  }

  getCurrenciesBalance(): Promise<CurrencyBalance[]> {
    return this.state.db.manager.find(CurrencyBalance)
  }

  async initialize() {
    await this.state.initialize()
    this.isInitialized = true
  }
}
