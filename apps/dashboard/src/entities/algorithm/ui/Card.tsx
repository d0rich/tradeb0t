import type { Algorithm } from '@tradeb0t/core'
import InputsDescriptor from './InputsDescriptor'

export interface CardProps {
  algorithm: Algorithm
  goToRunsComponent: JSX.Element
  runAlgorithmComponent: JSX.Element
  className?: string
}

export default function Card({ algorithm, goToRunsComponent, runAlgorithmComponent, className = '' }: CardProps) {
  return (
    <div className={`card card-compact bg-base-200 ${className}`}>
      <div className="card-body">
        <h3 className="card-title">{algorithm.name}</h3>
        <p className="my-2">{algorithm.description}</p>
        <InputsDescriptor inputs={algorithm.inputTypes} />
        <div className="card-actions justify-end">
          {goToRunsComponent}
          {runAlgorithmComponent}
        </div>
      </div>
    </div>
  )
}
