import type { SecurityBalance } from '../model/SecurityBalance'

export interface SecurityBalanceListItemProps {
  item: SecurityBalance
  className?: string
}

export default function SecurityBalanceListItem({ item, className = '' }: SecurityBalanceListItemProps) {
  return (
    <li className={`card bg-base-100 ${className}`}>
      <div className="card-body flex-row justify-between items-center gap-x-4 flex-wrap p-3">
        <div>
          <div className="text-lg font-bold">{item.asset.name}</div>
          <span>
            {item.assetTicker} x<span className="text-accent">{item.amount}</span>
          </span>
        </div>
        <span className="card-title">
          {item.asset.currencyTicker} <span className="text-accent">{item.asset.price}</span>
        </span>
      </div>
    </li>
  )
}
