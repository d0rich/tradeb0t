import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardWithoutData from '@/src/entities/portfolio/ui/BotPortfolioCard'

export interface BotPortfolioCardProps {
  botUrl: string
  className?: string
}

export default function BotPortfolioCard({ botUrl, className = '' }: BotPortfolioCardProps) {
  const { data: currencies } = trpc.control.portfolio.getCurrencies.useQuery({ url: botUrl })
  const { data: securities } = trpc.control.portfolio.getSecurities.useQuery({ url: botUrl })

  return <BotPortfolioCardWithoutData currencies={currencies!} securities={securities!} className={className} />
}
