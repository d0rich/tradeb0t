import { SecuritiesRepository } from './SecuritiesRepository'
import { PortfolioRepository } from './PortfolioRepository'
import { CurrenciesRepository } from './CurrenciesRepository'

export interface IInMemoryStorage {
  readonly securities: SecuritiesRepository
  readonly portfolio: PortfolioRepository
  readonly currencies: CurrenciesRepository

  isInitialized: boolean
  initialize(): Promise<void>
}
