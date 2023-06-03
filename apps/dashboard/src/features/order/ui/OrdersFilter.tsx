import { useRef } from 'react'
import type { GetOrdersOptions } from '@tradeb0t/core'
import OperationSelect from '@/src/shared/ui/OperationSelect'

export interface OrdersFilterProps {
  onChange: (options: GetOrdersOptions) => void
}

export default function OrdersFilter({ onChange }: OrdersFilterProps) {
  const filter = useRef<GetOrdersOptions>(getDefaultOptions())
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onChange(filter.current)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label className="input-group">
        <span className="label-text">Operation</span>
        <OperationSelect
          defaultValue={filter.current.operation}
          className="select-sm select-bordered"
          nullable
          onUpdate={(value) => {
            filter.current.operation = value
          }}
        />
      </label>
      <button type="submit" className="btn btn-sm btn-primary">
        Filter
      </button>
    </form>
  )
}

function getDefaultOptions(): GetOrdersOptions {
  let dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - 1)
  return {
    from: dateFrom,
    to: new Date()
  }
}
