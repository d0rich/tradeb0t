import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'

export interface UnitedPortfolioCardProps {
  className?: string
}

export default function UnitedPortfolioCard({ className = '' }: UnitedPortfolioCardProps) {
  const { data: currencies } = trpc.control.portfolio.getAllBotsCurrencies.useQuery()
  const { data: securities } = trpc.control.portfolio.getAllBotsSecurities.useQuery()

  return (
    <BotPortfolioCardFrame
      header={<>United portfolio</>}
      currencies={currencies!}
      securities={securities!}
      className={className}
    />
  )
}
