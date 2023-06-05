import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export interface BotNavigationProps {
  botUrl: string
  className?: string
}

export default function BotNavigation({ botUrl, className = '' }: BotNavigationProps) {
  const router = useRouter()
  const { pathname } = router
  const activeButton = useMemo(() => {
    if (pathname.includes('portfolio')) {
      return 'portfolio'
    }
    if (pathname.includes('logs')) {
      return 'logs'
    }
    if (pathname.includes('algorithms')) {
      return 'algorithms'
    }
    if (pathname.includes('orders')) {
      return 'orders'
    }
    return ''
  }, [pathname])
  return (
    <div className={`join ${className}`}>
      <Link
        href={`/bots/${botUrl}/portfolio`}
        className={`btn btn-sm sm:btn-md join-item ${activeButton === 'portfolio' ? 'btn-active' : ''}`}
      >
        Portfolio
      </Link>
      <Link
        href={`/bots/${botUrl}/logs`}
        className={`btn btn-sm sm:btn-md join-item ${activeButton === 'logs' ? 'btn-active' : ''}`}
      >
        Logs
      </Link>
      <Link
        href={`/bots/${botUrl}/algorithms`}
        className={`btn btn-sm sm:btn-md join-item ${activeButton === 'algorithms' ? 'btn-active' : ''}`}
      >
        Algorithms
      </Link>
      <Link
        href={`/bots/${botUrl}/orders`}
        className={`btn btn-sm sm:btn-md join-item ${activeButton === 'orders' ? 'btn-active' : ''}`}
      >
        Orders
      </Link>
    </div>
  )
}
