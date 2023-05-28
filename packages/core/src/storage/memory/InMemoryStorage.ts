import { SecuritiesRepository } from './SecuritiesRepository'
import { PortfolioRepository } from './PortfolioRepository'
import { CurrenciesRepository } from './CurrenciesRepository'
import { IInMemoryStorage } from './IInMemoryStorage'
import { DataSource } from 'typeorm'
import { Currency, Security, CurrencyBalance, SecurityBalance, Asset, AssetBalance } from 'src/domain'
import type { LoggerService } from 'src/bot'

export class InMemoryStorage implements IInMemoryStorage {
  isInitialized = false

  get securities() {
    return this._securities
  }

  get currencies() {
    return this._currencies
  }

  get portfolio() {
    return this._portfolio
  }

  private _securities: SecuritiesRepository
  private _portfolio: PortfolioRepository
  private _currencies: CurrenciesRepository
  private datasource: DataSource

  constructor() {
    this.datasource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      logging: false,
      synchronize: true,
      entities: [Currency, Security, CurrencyBalance, SecurityBalance, Asset, AssetBalance]
    })
  }

  async initialize(loggerService?: LoggerService) {
    await this.datasource.initialize()
    const securitiesRepository = new SecuritiesRepository(Security, this.datasource.manager)
    const currenciesRepository = new CurrenciesRepository(Currency, this.datasource.manager)
    const portfolioRepository = new PortfolioRepository(this.datasource.manager)
    if (loggerService) {
      this._securities = loggerService.createErrorHandlingProxy(securitiesRepository)
      this._currencies = loggerService.createErrorHandlingProxy(currenciesRepository)
      this._portfolio = loggerService.createErrorHandlingProxy(portfolioRepository)
    } else {
      this._securities = securitiesRepository
      this._currencies = currenciesRepository
      this._portfolio = portfolioRepository
    }
    this.isInitialized = true
  }
}
