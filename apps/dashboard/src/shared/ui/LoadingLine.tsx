export interface LoadingLineProps {
  className?: string
}

export default function LoadingLine({ className = '' }: LoadingLineProps) {
  return <progress className={`progress ${className}`}></progress>
}
