import { trpc } from '@/src/shared/api/trpc'
import PortfolioListItem from '@/src/entities/portfolio/ui/SecurityBalanceListItem'
import SecurityBalanceListItem from '@/src/entities/portfolio/ui/CurrencyBalanceView'

export interface BotPortfolioCardProps {
  botUrl: string
  className?: string
}

export default function BotPortfolioCard({ botUrl, className = '' }: BotPortfolioCardProps) {
  const { data: currencies } = trpc.control.portfolio.getCurrencies.useQuery({ url: botUrl })
  const { data: securities } = trpc.control.portfolio.getSecurities.useQuery({ url: botUrl })

  return (
    <div className={`card card-compact bg-base-200 ${className}`}>
      <div className="card-body">
        <h3 className="card-title">Portfolio</h3>
        <h4 className="text-lg font-bold">Currencies</h4>
        <div className="card bg-base-100">
          <div className="flex gap-4 p-3">
            {currencies?.map((item) => (
              <SecurityBalanceListItem key={item.assetTicker} item={item} />
            ))}
          </div>
        </div>
        <h4 className="text-lg font-bold">Securities</h4>
        <ul className="max-h-[50vh] overflow-y-auto">
          {securities?.map((item) => (
            <PortfolioListItem key={item.assetTicker} item={item} className="my-1" />
          ))}
        </ul>
      </div>
    </div>
  )
}
