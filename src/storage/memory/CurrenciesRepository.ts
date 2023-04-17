import { Currency } from 'src/domain'
import { Repository } from 'typeorm'

export class CurrenciesRepository extends Repository<Currency> {
  async findByTicker(currencyTicker: string) {
    const currency = await this.findOne({ where: [{ ticker: currencyTicker }, { exchangeTicker: currencyTicker }] })
    return currency
  }

  /**
   * Set all currencies
   *
   * @param currencies
   */
  async updateAll(currencies: Currency[]) {
    await this.upsert(currencies, {
      conflictPaths: {
        ticker: true,
        // FIXME: it seems exchangeTicker is not unique because of table inheritance
        // exchangeTicker: true
      }
    })
  }
}
