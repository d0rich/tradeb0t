import type { AlgorithmRun } from '@tradeb0t/core'

export interface AlgorithmRunStateViewProps {
  state: AlgorithmRun['state']
  className?: string
}

export default function AlgorithmRunStateView({ state, className = '' }: AlgorithmRunStateViewProps) {
  const jsonValue = JSON.stringify(state, null, 2)
  return <pre className={`${className}`}>{jsonValue}</pre>
}
