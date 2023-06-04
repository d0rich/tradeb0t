import { useRef } from 'react'
import type { GetOrdersOptions } from '@tradeb0t/core'
import OperationSelect from '@/src/shared/ui/OperationSelect'

export interface OrdersFilterProps {
  defaultValue: GetOrdersOptions
  onChange: (options: GetOrdersOptions) => void
}

export default function OrdersFilter({ onChange, defaultValue }: OrdersFilterProps) {
  const filter = useRef<GetOrdersOptions>(defaultValue)
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onChange(filter.current)
  }
  return (
    <form className="card card-compact bg-base-200 w-fit" onSubmit={handleSubmit}>
      <div className="card-body ">
        <div className="card-title">Filters</div>
        <div className="grid md:grid-cols-2 gap-2">
          <label className="input-group input-group-vertical md:col-span-2">
            <span className="label-text">Date range</span>
            <div className="join join-vertical md:join-horizontal">
              <input
                type="datetime-local"
                defaultValue={filter.current.from?.toISOString().slice(0, -5)}
                className="input input-sm input-bordered !join-item w-full md:w-1/2"
                onChange={(e) => {
                  filter.current.from = new Date(e.target.value)
                }}
              />
              <input
                type="datetime-local"
                defaultValue={filter.current.to?.toISOString().slice(0, -5)}
                className="input input-sm input-bordered !join-item w-full md:w-1/2"
                onChange={(e) => {
                  filter.current.to = new Date(e.target.value)
                }}
              />
            </div>
          </label>
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
          <label className="input-group">
            <span className="label-text">Security</span>
            <input
              type="text"
              defaultValue={filter.current.operation}
              className="input input-sm input-bordered"
              onChange={(e) => {
                if (e.target.value === '') {
                  filter.current.securityTicker = undefined
                  return
                }
                filter.current.securityTicker = e.target.value
              }}
            />
          </label>
          <label className="input-group">
            <span className="label-text">Run ID</span>
            <input
              type="number"
              defaultValue={filter.current.operation}
              className="input input-sm input-bordered"
              onChange={(e) => {
                if (e.target.value === '') {
                  filter.current.runId = undefined
                  return
                }
                filter.current.runId = Number(e.target.value)
              }}
            />
          </label>
          <button type="submit" className="btn btn-sm btn-primary">
            Filter
          </button>
        </div>
      </div>
    </form>
  )
}
