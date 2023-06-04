import { useEffect } from 'react'
import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'

export interface UnitedPortfolioCardProps {
  className?: string
}

export default function UnitedPortfolioCard({ className = '' }: UnitedPortfolioCardProps) {
  const { data: currencies, refetch: refetchCurrencies } = trpc.control.portfolio.getAllBotsCurrencies.useQuery()
  const { data: securities, refetch: refetchSecurities } = trpc.control.portfolio.getAllBotsSecurities.useQuery()

  // TODO: use socket to refetch
  useEffect(() => {
    const timer = setInterval(() => {
      refetchCurrencies()
      refetchSecurities()
    }, 3000)
    return () => clearInterval(timer)
  }, [currencies, securities])

  return (
    <BotPortfolioCardFrame
      header={<>United portfolio</>}
      currencies={currencies!}
      securities={securities!}
      className={className}
      actions={
        <button
          className="btn btn-primary btn-circle text-xl btn-sm"
          onClick={() => {
            refetchCurrencies()
            refetchSecurities()
          }}
        >
          ⟳
        </button>
      }
    />
  )
}
