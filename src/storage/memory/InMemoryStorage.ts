import { SecuritiesRepository } from './SecuritiesRepository'
import { PortfolioRepository } from './PortfolioRepository'
import { CurrenciesRepository } from './CurrenciesRepository'
import { IInMemoryStorage } from './IInMemoryStorage'
import { DataSource } from 'typeorm'
import { Currency, Security, CurrencyBalance, SecurityBalance, Asset, AssetBalance } from 'src/domain'

export class InMemoryStorage implements IInMemoryStorage {
  isInitialized = false

  readonly securities: SecuritiesRepository
  readonly portfolio: PortfolioRepository
  readonly currencies: CurrenciesRepository
  private datasource: DataSource

  constructor() {
    this.datasource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      logging: false,
      synchronize: true,
      entities: [Currency, Security, CurrencyBalance, SecurityBalance, Asset, AssetBalance]
    })
    this.securities = new SecuritiesRepository(Security, this.datasource.manager)
    this.currencies = new CurrenciesRepository(Currency, this.datasource.manager)
    this.portfolio = new PortfolioRepository(this.datasource.manager)
  }

  async initialize() {
    await this.datasource.initialize()
    this.isInitialized = true
  }
}
