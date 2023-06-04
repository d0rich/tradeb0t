import Loading from './Loading'

export interface LoadingCardProps {
  className?: string
}

export default function LoadingCard({ className = '' }: LoadingCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="card-body items-center">
        <Loading />
      </div>
    </div>
  )
}
