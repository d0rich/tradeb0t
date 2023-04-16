import { Currency, CurrencyBalance, Security, SecurityBalance, Order } from 'src/domain'
import { DataSource } from 'typeorm'
import {faker} from '@faker-js/faker'

const ExchangeDataSource = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  logging: false,
  synchronize: true,
  entities: [Currency, Security, CurrencyBalance, SecurityBalance, Order]
})

ExchangeDataSource
  .initialize()
  .then(async () => {
    for (let i = 0; i < 10; i++) {
      const currency = new Currency()
      currency.name = faker.finance.currencyName()
      currency.ticker = faker.finance.currencyCode()
      if (Math.random() > 0.5) {
        currency.balance = new CurrencyBalance()
        currency.balance.amount = Number(faker.finance.amount(500, 5000, 0))
      }
      try {
        await ExchangeDataSource.manager.save(currency)
      } catch {}
    }

    for (let i = 0; i < 50; i++) {
      const security = new Security()
      security.name = faker.company.name()
      security.ticker = faker.company.bsBuzz().toUpperCase()
      if (Math.random() > 0.9) {
        security.balance = new SecurityBalance()
        security.balance.amount = Number(faker.finance.amount(10, 100, 0))
      }
      try {
        await ExchangeDataSource.manager.save(security)
      } catch {}
    }
  })

while (!ExchangeDataSource.isInitialized) {
  continue
}

export { ExchangeDataSource }
