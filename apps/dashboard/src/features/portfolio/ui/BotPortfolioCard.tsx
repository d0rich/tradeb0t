import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'
import { useEffect } from 'react'

export interface BotPortfolioCardProps {
  botUrl: string
  className?: string
}

export default function BotPortfolioCard({ botUrl, className = '' }: BotPortfolioCardProps) {
  const { data: currencies, refetch: refetchCurrencies } = trpc.control.portfolio.getCurrencies.useQuery({
    url: botUrl
  })
  const { data: securities, refetch: refetchSecurities } = trpc.control.portfolio.getSecurities.useQuery({
    url: botUrl
  })

  useEffect(() => {
    const timer = setInterval(() => {
      refetchCurrencies()
      refetchSecurities()
    }, 3000)
    return () => clearInterval(timer)
  }, [currencies, securities])

  return (
    <BotPortfolioCardFrame
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
      currencies={currencies!}
      securities={securities!}
      className={className}
    />
  )
}
