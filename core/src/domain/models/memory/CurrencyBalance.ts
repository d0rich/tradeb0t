import { ChildEntity, OneToOne, JoinColumn } from 'typeorm'
import { AssetBalance } from './AssetBalance'
import { Currency } from './Currency'

@ChildEntity()
export class CurrencyBalance extends AssetBalance {
  @OneToOne(() => Currency, (asset) => asset.balance)
  @JoinColumn({ name: 'assetTicker' })
  asset: Currency
}
