import type { Algorithm } from '@tradeb0t/core'

export interface CardProps {
  algorithm: Algorithm
  goToRunsComponent: JSX.Element
  runAlgorithmComponent: JSX.Element
  className?: string
}

export default function Card({ algorithm, goToRunsComponent, runAlgorithmComponent, className }: CardProps) {
  return (
    <div className={`card card-compact bg-base-300 ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{algorithm.name}</h2>
        <p>{algorithm.description}</p>
        <div className="card-actions justify-end">
          {goToRunsComponent}
          {runAlgorithmComponent}
        </div>
      </div>
    </div>
  )
}
