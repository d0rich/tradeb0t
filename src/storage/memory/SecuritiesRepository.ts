import { deepCopy } from '../utils'
import { PortfolioRepository } from './PortfolioRepository'
import { Security } from 'src/domain'

export class SecuritiesRepository {
  private items: Security[] = []
  private followList: string[] = []
  private updateJournal: Map<string, Date> = new Map<string, Date>()
  private portfolioStore: PortfolioRepository

  setPortfolioStore(store: PortfolioRepository) {
    if (!this.portfolioStore) this.portfolioStore = store
  }

  get securities() {
    return deepCopy(this.items)
  }
  get followedSecurities() {
    return this.securities.filter((s) => this.followList.includes(s.ticker))
  }
  get securitiesWithUpdates() {
    return this.securities.map((sec) => ({
      ...sec,
      updatedAt: this.updateJournal.get(sec.ticker)
    }))
  }

  follow(securityTicker: string) {
    if (!this.followList.includes(securityTicker)) this.followList.push(securityTicker)
    return deepCopy(this.items.find((s) => s.ticker === securityTicker))
  }
  unfollow(securityTicker: string) {
    const index = this.followList.indexOf(securityTicker)
    if (index !== -1) this.followList.splice(index, 1)
    return deepCopy(this.items.find((s) => s.ticker === securityTicker))
  }

  updateSecurities(...securities: Security[]) {
    for (const security of deepCopy(securities)) {
      const foundSecurity = this.items.find((item) => item.ticker === security.ticker)
      if (!foundSecurity) {
        this.items.push(deepCopy(security))
      } else {
        foundSecurity.price = security.price
      }
      this.updateJournal.set(security.ticker, new Date())
    }
  }

  getBalanceOf(securityTicker: string) {
    const security = this.items.find((s) => s.ticker === securityTicker)
    if (!security) return
    return (
      this.portfolioStore.securities.find((sec) => sec.securityTicker === securityTicker) ?? {
        securityTicker,
        type: 'security',
        amount: 0
      }
    )
  }
}
