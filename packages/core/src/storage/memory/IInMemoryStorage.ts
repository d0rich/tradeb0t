import type { SecuritiesRepository } from './SecuritiesRepository'
import type { PortfolioRepository } from './PortfolioRepository'
import type { CurrenciesRepository } from './CurrenciesRepository'
import type { LoggerService } from 'src/bot'

export interface IInMemoryStorage {
  readonly securities: SecuritiesRepository
  readonly portfolio: PortfolioRepository
  readonly currencies: CurrenciesRepository

  isInitialized: boolean
  initialize(loggerService?: LoggerService): Promise<void>
}
