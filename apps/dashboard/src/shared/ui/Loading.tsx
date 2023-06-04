export interface LoadingProps {
  className?: string
}

export default function Loading({ className = '' }: LoadingProps) {
  return <span className={`loading loading-spinner loading-lg ${className}`}></span>
}
