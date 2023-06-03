import type { OperationType } from '@tradeb0t/core'
import { EOperationType } from '@tradeb0t/core/dist/enums'

export interface OperationSelectProps {
  defaultValue?: OperationType
  onUpdate?: (value?: OperationType) => void
  className?: string
  nullable?: boolean
}

export default function OperationSelect({ defaultValue, onUpdate, className = '', nullable }: OperationSelectProps) {
  return (
    <select
      defaultValue={defaultValue}
      className={`select ${className}`}
      onChange={(e) => {
        if (onUpdate) {
          if (e.target.value === 'any') {
            onUpdate(undefined)
            return
          }
          onUpdate(e.target.value as OperationType)
        }
      }}
    >
      {nullable ? <option value="any">Any</option> : null}
      {Object.values(EOperationType).map((operation) => (
        <option key={operation} value={operation}>
          {operation}
        </option>
      ))}
    </select>
  )
}
