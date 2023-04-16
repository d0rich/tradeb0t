import { Entity, Column, PrimaryColumn, TableInheritance, OneToOne, UpdateDateColumn } from 'typeorm'
import { AssetBalance } from './AssetBalance'

@Entity()
@TableInheritance({ column: { type: 'text', name: 'type' } })
export class Asset {
  @PrimaryColumn()
  ticker: string

  @Column({ unique: true })
  name: string

  @OneToOne(() => AssetBalance, (assetBalance) => assetBalance.asset)
  balance: AssetBalance

  @UpdateDateColumn()
  updatedAt: Date
}
