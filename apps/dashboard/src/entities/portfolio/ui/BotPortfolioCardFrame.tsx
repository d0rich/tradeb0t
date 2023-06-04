import SecurityBalanceListItem from './SecurityBalanceListItem'
import CurrencyBalanceView from './CurrencyBalanceView'
import type { CurrencyBalance } from '../model/CurrencyBalance'
import type { SecurityBalance } from '../model/SecurityBalance'

export interface BotPortfolioCardFrameProps {
  currencies: CurrencyBalance[]
  securities: SecurityBalance[]
  className?: string
  header?: JSX.Element
  actions?: JSX.Element
}

export default function BotPortfolioCardFrame({
  currencies,
  securities,
  className = '',
  header = <>Portfolio</>,
  actions
}: BotPortfolioCardFrameProps) {
  return (
    <div className={`card card-compact bg-base-200 ${className}`}>
      <div className="card-body">
        <div className="flex justify-between">
          <h3 className="card-title">{header}</h3>
          <div>{actions}</div>
        </div>
        <h4 className="text-lg font-bold">Currencies</h4>
        <div className="card bg-base-100">
          <div className="flex gap-4 p-3">
            {currencies?.map((item) => (
              <CurrencyBalanceView key={item.assetTicker} item={item} />
            ))}
          </div>
        </div>
        <h4 className="text-lg font-bold">Securities</h4>
        <ul className="max-h-[50vh] overflow-y-auto">
          {securities?.map((item) => (
            <SecurityBalanceListItem key={item.assetTicker} item={item} className="my-1" />
          ))}
        </ul>
      </div>
    </div>
  )
}
