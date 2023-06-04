import Link from 'next/link'

export interface BotNavigationProps {
  botUrl: string
  className?: string
}

export default function BotNavigation({ botUrl, className = '' }: BotNavigationProps) {
  return (
    <div className={`join ${className}`}>
      <Link href={`/bots/${botUrl}/orders`} className="btn join-item">
        Orders
      </Link>
    </div>
  )
}
