import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardWithoutData from '@/src/entities/portfolio/ui/BotPortfolioCard'

export interface UnitedPortfolioCardProps {
  className?: string
}

export default function UnitedPortfolioCard({ className = '' }: UnitedPortfolioCardProps) {
  const { data: currencies } = trpc.control.portfolio.getAllBotsCurrencies.useQuery()
  const { data: securities } = trpc.control.portfolio.getAllBotsSecurities.useQuery()

  return (
    <BotPortfolioCardWithoutData
      header={<>United portfolio</>}
      currencies={currencies!}
      securities={securities!}
      className={className}
    />
  )
}
