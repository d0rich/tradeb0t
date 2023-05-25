import type { OperationType } from '@tradeb0t/core'
import {EInputType, EOperationType} from '@tradeb0t/core/dist/domain/models/persistent'
import { InputHTMLAttributes, useState, useEffect } from 'react'
import { TypeFromInputType } from '../model/TypeFromInputType'

export type InputFieldProps<T extends `${EInputType}`> = {
  name: string
  type: T
  value: TypeFromInputType<T>
  onUpdate: (value: TypeFromInputType<T>) => void
}

export default function InputField<T extends `${EInputType}`>({ name, type, value, onUpdate }: InputFieldProps<T>) {
  switch (type) {
    case EInputType.NUMBER:
      return <InputFieldGeneric<T> inputAttrs={{ type: 'number' }} {...{ type, name, value, onUpdate }} />
    case EInputType.STRING:
      return (
        <InputFieldGeneric<T> inputAttrs={{ type: 'text' }} type={type} name={name} value={value} onUpdate={onUpdate} />
      )
    case EInputType.DATE:
      return <InputFieldGeneric<T> inputAttrs={{ type: 'datetime-local' }} {...{ type, name, value, onUpdate }} />
    case EInputType.ORDER_DETAILS:
      return <InputFieldOrderDetails {...{ name, value, onUpdate } as InputFieldOrderDetailsProps} />
    default:
      return (
        <InputFieldGeneric<T>
          inputAttrs={{ type: 'text', disabled: true }}
          {...{ type, value, onUpdate }}
          name={`Unknown type: ${name}`}
        />
      )
  }
}

type InputFieldOrderDetailsProps = Omit<InputFieldProps<EInputType.ORDER_DETAILS>, 'type'>

function InputFieldOrderDetails({ name, value, onUpdate }: InputFieldOrderDetailsProps) {
  const [operationType, setOperationType] = useState<OperationType>(value.operation)
  const [price, setPrice] = useState<number>(value.price)
  const [lots, setLots] = useState<number>(value.lots)
  const [ticker, setTicker] = useState<string>(value.ticker)

  useEffect(() => {
    onUpdate({ operation: operationType, price, lots, ticker })
  }, [operationType, price, lots, ticker])

  return (
    <label className="input-group input-group-vertical">
      <span>{name}</span>
      <InputFieldGeneric<EInputType.STRING>
        inputAttrs={{ type: 'text' }}
        name="Ticker"
        type={EInputType.STRING}
        value={ticker}
        onUpdate={setTicker}
      />
      <div className="form-control">
        <div className="input-group">
          <span className="label-text">Operation</span>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setOperationType(e.target.value as OperationType)}
          >
            {Object.values(EOperationType).map((operation) => (
              <option key={operation} value={operation} selected={operation === operationType}>
                {operation}
              </option>
            ))}
          </select>
        </div>
      </div>
      <InputFieldGeneric<EInputType.NUMBER>
        inputAttrs={{ type: 'number' }}
        name="Price"
        type={EInputType.NUMBER}
        value={price}
        onUpdate={setPrice}
      />
      <InputFieldGeneric<EInputType.NUMBER>
        inputAttrs={{ type: 'number' }}
        name="Lots"
        type={EInputType.NUMBER}
        value={lots}
        onUpdate={setLots}
      />
    </label>
  )
}

function InputFieldGeneric<T extends `${EInputType}`>({
  name,
  type,
  value,
  onUpdate,
  inputAttrs
}: InputFieldProps<T> & { inputAttrs?: InputHTMLAttributes<HTMLInputElement> }) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (type === EInputType.STRING) return onUpdate(e.target.value as TypeFromInputType<T>)
    if (type === EInputType.NUMBER) return onUpdate(Number(e.target.value) as TypeFromInputType<T>)
    if (type === EInputType.DATE) return onUpdate(new Date(e.target.value) as TypeFromInputType<T>)
    console.error(new Error(`Unsupported type: ${type}`))
  }

  return (
    <div className="form-control">
      <label className="input-group">
        <span className="label-text">{name}</span>
        <input
          className="input input-bordered"
          placeholder={name}
          value={String(value)}
          onChange={onChange}
          {...inputAttrs}
        />
      </label>
    </div>
  )
}
