import { ChildEntity, OneToMany, OneToOne, Column } from 'typeorm'
import { Security } from './Security'
import { Asset } from './Asset'
import { CurrencyBalance } from './CurrencyBalance'

@ChildEntity()
export class Currency extends Asset {
  /**
   * Ticker used to buy and sell currency on exchange
   */
  @Column({ unique: true, nullable: true })
  exchangeTicker?: string

  @OneToMany(() => Security, (security) => security.currency)
  securities: Security[]

  @OneToOne(() => CurrencyBalance, (assetBalance) => assetBalance.asset)
  balance: CurrencyBalance
}
