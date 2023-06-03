import { CurrencyBalance } from '../model/CurrencyBalance'

export interface CurrencyBalanceViewProps {
  item: CurrencyBalance
  className?: string
}

export default function CurrencyBalanceView({ item, className = '' }: CurrencyBalanceViewProps) {
  return (
    <span className={`tooltip ${className}`} data-tip={item.asset.name}>
      <span className="text-xl font-bold">{item.assetTicker}</span>
      {' x'}
      <span className="text-lg text-accent">{item.amount}</span>
    </span>
  )
}
