import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'

export interface BotPortfolioCardProps {
  botUrl: string
  className?: string
}

export default function BotPortfolioCard({ botUrl, className = '' }: BotPortfolioCardProps) {
  const { data: currencies } = trpc.control.portfolio.getCurrencies.useQuery({ url: botUrl })
  const { data: securities } = trpc.control.portfolio.getSecurities.useQuery({ url: botUrl })

  return <BotPortfolioCardFrame currencies={currencies!} securities={securities!} className={className} />
}
