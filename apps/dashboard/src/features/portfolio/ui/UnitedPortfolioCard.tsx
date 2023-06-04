import { useEffect } from 'react'
import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'
import Loading from '@/src/shared/ui/Loading'
import LoadingCard from '@/src/shared/ui/LoadingCard'

export interface UnitedPortfolioCardProps {
  className?: string
}

export default function UnitedPortfolioCard({ className = '' }: UnitedPortfolioCardProps) {
  const {
    data: currencies,
    refetch: refetchCurrencies,
    isLoading: isLoadingCurrencies,
    isFetching: isFetchingCurrencies
  } = trpc.control.portfolio.getAllBotsCurrencies.useQuery()
  const {
    data: securities,
    refetch: refetchSecurities,
    isLoading: isLoadingSecurities,
    isFetching: isFetchingSecurities
  } = trpc.control.portfolio.getAllBotsSecurities.useQuery()

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
      header={<>United portfolio</>}
      currencies={currencies!}
      securities={securities!}
      className={className}
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
    />
  )
}
