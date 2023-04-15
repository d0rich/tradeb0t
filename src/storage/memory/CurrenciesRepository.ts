import { deepCopy } from '../utils'
import { PortfolioRepository } from './PortfolioRepository'
import { Currency } from 'src/domain'

export class CurrenciesRepository {
  private items: Currency[] = []
  private portfolioStore: PortfolioRepository

  setPortfolioStore(store: PortfolioRepository) {
    if (!this.portfolioStore) this.portfolioStore = store
  }

  get currencies() {
    return deepCopy(this.items)
  }

  /**
   * Set all currencies
   *
   * @param currencies
   */
  updateCurrenciesAll(currencies: Currency[]) {
    this.items = deepCopy(currencies)
  }

  getBalanceOf(currencyTicker: string) {
    const currency = this.items.find((c) => c.ticker === currencyTicker || c.exchangeTicker === currencyTicker)
    if (!currency) return
    return (
      this.portfolioStore.currencies.find(
        (cur) => cur.currencyTicker === currency.ticker || cur.currencyTicker === currency.exchangeTicker
      ) ?? { currencyTicker, type: 'currency', amount: 0 }
    )
  }
}
