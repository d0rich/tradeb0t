import { Security } from 'src/domain'
import { Repository, In } from 'typeorm'

export class SecuritiesRepository extends Repository<Security> {
  async findByTicker(securityTicker: string) {
    const security = await this.findOneBy({ ticker: securityTicker })
    return security
  }

  async findByTickers(securityTickers: string[]) {
    const security = await this.findBy({ ticker: In(securityTickers) })
    return security
  }

  async findAllFollowed() {
    return this.findBy({ isFollowed: true })
  }

  async follow(securityTicker: string) {
    const security = await this.findOneBy({ ticker: securityTicker })
    if (!security) {
      throw new Error(`Security with ticker ${securityTicker} not found`)
    }
    security.isFollowed = true
    return await this.save(security)
  }

  async unfollow(securityTicker: string) {
    const security = await this.findOneBy({ ticker: securityTicker })
    if (!security) {
      throw new Error(`Security with ticker ${securityTicker} not found`)
    }
    security.isFollowed = false
    return await this.save(security)
  }

  async updateAll(...securities: Security[]) {
    await this.upsert(securities, {
      conflictPaths: {
        ticker: true
      }
    })
  }
}
