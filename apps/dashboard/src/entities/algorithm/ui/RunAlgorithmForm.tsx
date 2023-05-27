import type { Algorithm, InputTypes } from '@tradeb0t/core'
import { EInputType } from '@tradeb0t/core/dist/enums'
import InputField from './InputField'
import { TypeFromInputType } from '../model/TypeFromInputType'
import { useState } from 'react'

export interface RunAlgorithmFormProps {
  algorithm: Algorithm
  closeComponent: JSX.Element
  actionsComponent: JSX.Element
  onSubmit: (model: Record<string, TypeFromInputType<EInputType>>) => void
  className?: string
}

export default function RunAlgorithmForm({
  algorithm,
  closeComponent,
  actionsComponent,
  className,
  onSubmit
}: RunAlgorithmFormProps) {
  const [model, setModel] = useState(getDefaultModel(algorithm.inputTypes))
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(model)
  }
  return (
    <form onSubmit={handleSubmit} className={`card card-compact bg-base-300 ${className}`}>
      {closeComponent}
      <h2 className="card-title">Run {algorithm.name}</h2>
      <div className="form-control gap-y-2">
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
      {actionsComponent}
    </form>
  )
}

function getDefaultModel(inputs: InputTypes) {
  return Object.keys(inputs).reduce((acc, inputName) => {
    const inputType = inputs[inputName]
    if (inputType === EInputType.NUMBER) {
      acc[inputName] = 0
    } else if (inputType === EInputType.STRING) {
      acc[inputName] = ''
    } else if (inputType === EInputType.DATE) {
      acc[inputName] = new Date()
    } else if (inputType === EInputType.ORDER_DETAILS) {
      acc[inputName] = {
        operation: 'limit_buy',
        price: 0,
        lots: 0,
        ticker: ''
      }
    }
    return acc
  }, {} as Record<keyof InputTypes, TypeFromInputType<EInputType>>)
}
