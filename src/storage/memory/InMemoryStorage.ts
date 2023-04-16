import { SecuritiesRepository } from './SecuritiesRepository'
import { PortfolioRepository } from './PortfolioRepository'
import { CurrenciesRepository } from './CurrenciesRepository'
import { IInMemoryStorage } from './IInMemoryStorage'
import { DataSource } from 'typeorm'
import { Currency, Security, CurrencyBalance, SecurityBalance } from 'src/domain'

export class InMemoryStorage implements IInMemoryStorage {
  readonly securities: SecuritiesRepository
  readonly portfolio: PortfolioRepository
  readonly currencies: CurrenciesRepository

  private readonly datasource: DataSource

  constructor() {
    this.datasource = this.initDatasource()
    this.securities = new SecuritiesRepository(Security, this.datasource.manager)
    this.currencies = new CurrenciesRepository(Currency, this.datasource.manager)
    this.portfolio = new PortfolioRepository(this.datasource.manager)
  }

  private initDatasource() {
    const datasource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      logging: false,
      synchronize: true,
      entities: [Currency, Security, CurrencyBalance, SecurityBalance]
    })
    datasource.initialize()
    // TODO: remove this hack
    // Wait for datasource to be initialized
    while (!datasource.isInitialized) {
      continue
    }
    return datasource
  }
}
