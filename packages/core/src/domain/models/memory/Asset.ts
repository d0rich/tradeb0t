import { Entity, Column, PrimaryColumn, TableInheritance, OneToOne, UpdateDateColumn } from 'typeorm'
import { AssetBalance } from './AssetBalance'
import { dateTransformer } from 'src/storage'

@Entity()
@TableInheritance({ column: { type: 'text', name: 'type' } })
export class Asset {
  @PrimaryColumn()
  ticker: string

  @Column({ unique: true })
  name: string

  @OneToOne(() => AssetBalance, (assetBalance) => assetBalance.asset)
  balance: AssetBalance

  @UpdateDateColumn({
    type: 'int',
    transformer: dateTransformer,
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date
}
