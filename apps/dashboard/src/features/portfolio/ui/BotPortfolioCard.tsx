import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'
import { useEffect } from 'react'
import Loading from '@/src/shared/ui/Loading'
import LoadingCard from '@/src/shared/ui/LoadingCard'

export interface BotPortfolioCardProps {
  botUrl: string
  className?: string
}

export default function BotPortfolioCard({ botUrl, className = '' }: BotPortfolioCardProps) {
  const {
    data: currencies,
    refetch: refetchCurrencies,
    isLoading: isLoadingCurrencies,
    isFetching: isFetchingCurrencies
  } = trpc.control.portfolio.getCurrencies.useQuery({
    url: botUrl
  })
  const {
    data: securities,
    refetch: refetchSecurities,
    isLoading: isLoadingSecurities,
    isFetching: isFetchingSecurities
  } = trpc.control.portfolio.getSecurities.useQuery({
    url: botUrl
  })

  // TODO: use socket to refetch
  useEffect(() => {
    const timer = setInterval(() => {
      refetchCurrencies()
      refetchSecurities()
    }, 3000)
    return () => clearInterval(timer)
  }, [currencies, securities])

  if (isLoadingCurrencies || isLoadingSecurities) return <LoadingCard />

  return (
    <BotPortfolioCardFrame
      actions={
        <>
          <Loading className={`${isFetchingCurrencies || isFetchingSecurities ? '' : 'opacity-0'}`} />
          <button
            className="btn btn-primary btn-circle text-xl btn-sm"
            onClick={() => {
              refetchCurrencies()
              refetchSecurities()
            }}
          >
            ⟳
          </button>
        </>
      }
      currencies={currencies!}
      securities={securities!}
      className={className}
    />
  )
}
