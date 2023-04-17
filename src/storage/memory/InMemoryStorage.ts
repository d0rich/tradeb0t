import { SecuritiesRepository } from './SecuritiesRepository'
import { PortfolioRepository } from './PortfolioRepository'
import { CurrenciesRepository } from './CurrenciesRepository'
import { IInMemoryStorage } from './IInMemoryStorage'
import { DataSource } from 'typeorm'
import { Currency, Security, CurrencyBalance, SecurityBalance, Asset, AssetBalance } from 'src/domain'

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

  async initialize() {
    await this.datasource.initialize()
    this._securities = new SecuritiesRepository(Security, this.datasource.manager)
    this._currencies = new CurrenciesRepository(Currency, this.datasource.manager)
    this._portfolio = new PortfolioRepository(this.datasource.manager)
    this.isInitialized = true
  }
}
