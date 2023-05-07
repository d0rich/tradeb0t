import { Entity, Column, PrimaryColumn, TableInheritance, OneToOne, UpdateDateColumn, JoinColumn } from 'typeorm'
import { Asset } from './Asset'
import { onlyPositiveNumbersTransformer, dateTransformer } from 'src/storage'

@Entity()
@TableInheritance({ column: { type: 'text', name: 'type' } })
export class AssetBalance {
  @PrimaryColumn()
  assetTicker: string

  @OneToOne(() => Asset, (asset) => asset.balance)
  @JoinColumn({ name: 'assetTicker' })
  asset: Asset

  @Column('integer', { default: 0, transformer: onlyPositiveNumbersTransformer })
  amount: number

  @UpdateDateColumn({
    type: 'int',
    transformer: dateTransformer
  })
  updatedAt: Date
}
