import { SecuritiesRepository } from './SecuritiesRepository'
import { PortfolioRepository } from './PortfolioRepository'
import { CurrenciesRepository } from './CurrenciesRepository'
import { IInMemoryStorage } from './IInMemoryStorage'

export class InMemoryStorage implements IInMemoryStorage {
  readonly securities: SecuritiesRepository
  readonly portfolio: PortfolioRepository
  readonly currencies: CurrenciesRepository

  constructor() {
    this.securities = new SecuritiesRepository()
    this.portfolio = new PortfolioRepository()
    this.currencies = new CurrenciesRepository()

    this.securities.setPortfolioStore(this.portfolio)
    this.currencies.setPortfolioStore(this.portfolio)
    this.portfolio.setSecuritiesStore(this.securities)
  }
}
