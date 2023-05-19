import {
  Currency,
  CurrencyBalance,
  Security,
  SecurityBalance,
  Order,
  Asset,
  AssetBalance,
  Algorithm,
  AlgorithmRun
} from '@tradeb0t/core'
import { DataSource } from 'typeorm'
import { faker } from '@faker-js/faker'

export class StubExchangeState {
  db: DataSource
  isInitialized = false

  async initialize() {
    const ExchangeDataSource = new DataSource({
      type: 'better-sqlite3',
      database: './stub-exchange.db',
      logging: false,
      synchronize: true,
      entities: [
        Currency,
        Security,
        CurrencyBalance,
        SecurityBalance,
        Order,
        Asset,
        AssetBalance,
        Algorithm,
        AlgorithmRun
      ]
    })
    await ExchangeDataSource.initialize()
    const currencies = await ExchangeDataSource.manager.find(Currency)
    if (currencies.length === 0) {
      await this.fillDatabase(ExchangeDataSource)
    }
    this.db = ExchangeDataSource
    this.isInitialized = true
  }

  private async fillDatabase(ExchangeDataSource: DataSource) {
    for (let i = 0; i < 10; i++) {
      const currency = new Currency()
      currency.name = faker.finance.currencyName()
      currency.ticker = faker.finance.currencyCode()
      try {
        await ExchangeDataSource.manager.save(currency)
        if (Math.random() > 0.5) {
          currency.balance = new CurrencyBalance()
          currency.balance.assetTicker = currency.ticker
          currency.balance.amount = Number(faker.finance.amount(500, 5000, 0))
          await ExchangeDataSource.manager.save(currency.balance)
        }
      } catch (err) {
        console.error(err)
      }
    }

    const currencies = await ExchangeDataSource.manager.find(Currency)

    for (let i = 0; i < 50; i++) {
      const security = new Security()
      security.name = faker.company.name()
      security.ticker = faker.company.bsBuzz().toUpperCase()
      security.price = Number(faker.finance.amount(10, 100, 0))
      security.currency = currencies[Math.floor(Math.random() * currencies.length)]
      try {
        await ExchangeDataSource.manager.save(security)
        if (Math.random() > 0.9) {
          security.balance = new SecurityBalance()
          security.balance.assetTicker = security.ticker
          security.balance.amount = Number(faker.finance.amount(10, 100, 0))
          await ExchangeDataSource.manager.save(security.balance)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
