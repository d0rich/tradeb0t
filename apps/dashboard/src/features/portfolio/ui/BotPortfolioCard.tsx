import { trpc } from '@/src/shared/api/trpc'
import BotPortfolioCardFrame from '@/src/entities/portfolio/ui/BotPortfolioCardFrame'
import { useEffect } from 'react'
import Loading from '@/src/shared/ui/Loading'
import LoadingCard from '@/src/shared/ui/LoadingCard'
import { usePushNotification } from '@/src/shared/hooks'
import { failedQueryNotification } from '@/src/shared/notifications/failedQueryNotification'

export interface BotPortfolioCardProps {
  botUrl: string
  className?: string
}

export default function BotPortfolioCard({ botUrl, className = '' }: BotPortfolioCardProps) {
  const pushNotification = usePushNotification()
  const {
    data: currencies,
    refetch: refetchCurrencies,
    isLoading: isLoadingCurrencies,
    isFetching: isFetchingCurrencies,
    error: errorCurrencies
  } = trpc.control.portfolio.getCurrencies.useQuery({
    url: botUrl
  })
  const {
    data: securities,
    refetch: refetchSecurities,
    isLoading: isLoadingSecurities,
    isFetching: isFetchingSecurities,
    error: errorSecurities
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

  if (errorCurrencies) pushNotification(failedQueryNotification('trpc.control.portfolio.getCurrencies'))
  if (errorSecurities) pushNotification(failedQueryNotification('trpc.control.portfolio.getSecurities'))

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
