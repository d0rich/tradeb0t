import type { AssetBalance } from '../model/AssetBalance'

export interface PortfolioListItemProps {
  item: AssetBalance
  className?: string
}

export default function PortfolioListItem({ item, className = '' }: PortfolioListItemProps) {
  return (
    <li className={`card bg-base-300 ${className}`}>
      <div className="card-body flex-row items-center gap-x-4 flex-wrap p-3">
        <span className="card-title">{item.assetTicker}</span>
        <span className="badge badge-primary">{item.amount}</span>
      </div>
    </li>
  )
}
