import type { Algorithm, InputTypes } from '@tradeb0t/core'
import { EInputType } from '@tradeb0t/core/dist/domain/models/persistent/Algorithm'
import InputField from './InputField'
import { TypeFromInputType } from '../model/TypeFromInputType'
import { useState } from 'react'

export interface RunCardProps {
  algorithm: Algorithm
  closeComponent: JSX.Element
  runComponent: JSX.Element
  className?: string
}

export default function RunCard({ algorithm, closeComponent, runComponent, className }: RunCardProps) {
  const [model, setModel] = useState(getDefaultModel(algorithm.inputTypes))
  return (
    <div className={`card card-compact bg-base-300 ${className}`}>
      <div className="card-body">
        <div className="card-actions justify-end">
          {closeComponent}
        </div>
        <h2 className="card-title">Run {algorithm.name}</h2>
        <div>
          {Object.keys(algorithm.inputTypes).map((inputName) => (
            <InputField
              key={inputName}
              name={inputName}
              value={model[inputName]}
              type={algorithm.inputTypes[inputName]}
              onUpdate={(value) => setModel((prevModel) => ({ ...prevModel, [inputName]: value }))}
            />
          ))}
        </div>
        <div className="card-actions justify-end">
          {runComponent}
        </div>
      </div>
    </div>
  )
}

function getDefaultModel(inputs: InputTypes) {
  return Object.keys(inputs).reduce((acc, inputName) => {
    const inputType = inputs[inputName]
    if (inputType === EInputType.NUMBER) {
      acc[inputName] = 0
    }
    else if (inputType === EInputType.STRING) {
      acc[inputName] = ''
    }
    else if (inputType === EInputType.DATE) {
      acc[inputName] = new Date()
    }
    else if (inputType === EInputType.ORDER_DETAILS) {
      acc[inputName] = {
        operation: 'limit_buy',
        price: 0,
        lots: 0,
        ticker: '',
      }
    }
    return acc
  }, {} as Record<keyof InputTypes, TypeFromInputType<EInputType>>)
}
