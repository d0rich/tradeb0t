import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { onlyPositiveNumbersTransformer } from 'src/storage'
import { Currency } from './Currency'
import { Asset } from './Asset'

import { SecurityBalance } from './SecurityBalance'

@Entity()
export class Security extends Asset {
  @Column({ transformer: onlyPositiveNumbersTransformer })
  price: number

  @ManyToOne(() => Currency, (currency) => currency.securities)
  @JoinColumn({ referencedColumnName: 'currencyTicker' })
  currency: Currency

  @Column()
  currencyTicker: string

  @OneToOne(() => SecurityBalance, (assetBalance) => assetBalance.asset)
  balance: SecurityBalance

  @Column()
  isFollowed: boolean
}
