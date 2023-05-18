import { ChildEntity, OneToOne, JoinColumn } from 'typeorm'
import { AssetBalance } from './AssetBalance'
import { Security } from './Security'

@ChildEntity()
export class SecurityBalance extends AssetBalance {
  @OneToOne(() => Security, (asset) => asset.balance)
  @JoinColumn({ name: 'assetTicker' })
  asset: Security
}
