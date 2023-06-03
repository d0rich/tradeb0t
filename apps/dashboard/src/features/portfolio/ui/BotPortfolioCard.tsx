import { trpc } from '@/src/shared/api/trpc'
import PortfolioListItem from '@/src/entities/portfolio/ui/PortfolioListItem'

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
        <h4>Currencies</h4>
        <ul>
          {currencies?.map((item) => (
            <PortfolioListItem key={item.assetTicker} item={item} className="my-1" />
          ))}
        </ul>
        <h4>Securities</h4>
        <ul>
          {securities?.map((item) => (
            <PortfolioListItem key={item.assetTicker} item={item} className="my-1" />
          ))}
        </ul>
      </div>
    </div>
  )
}
