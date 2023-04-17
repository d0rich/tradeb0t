import { Column, ManyToOne, JoinColumn, OneToOne, ChildEntity } from 'typeorm'
import { onlyPositiveNumbersTransformer } from 'src/storage'
import { Currency } from './Currency'
import { Asset } from './Asset'

import { SecurityBalance } from './SecurityBalance'

@ChildEntity()
export class Security extends Asset {
  @Column({ transformer: onlyPositiveNumbersTransformer })
  price: number

  @ManyToOne(() => Currency, (currency) => currency.securities)
  @JoinColumn({ name: 'currencyTicker' })
  currency: Currency

  @Column()
  currencyTicker: string

  @OneToOne(() => SecurityBalance, (assetBalance) => assetBalance.asset)
  balance: SecurityBalance

  @Column({ default: false })
  isFollowed: boolean
}
