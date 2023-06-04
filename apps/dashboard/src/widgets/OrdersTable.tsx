import { useCallback, useState } from 'react'
import { trpc } from '@/src/shared/api/trpc'
import OrdersTableWithoutData from '@/src/entities/order/ui/OrdersTable'
import OrdersFilter from '@/src/features/order/ui/OrdersFilter'
import type { GetOrdersOptions } from '@tradeb0t/core'

export interface OrdersTableProps {
  botUrl: string
}

export default function OrdersTable({ botUrl }: OrdersTableProps) {
  const [filter, setFilter] = useState<GetOrdersOptions>(getDefaultFilter())
  const { data: orders, refetch } = trpc.control.orders.search.useQuery({
    url: botUrl,
    options: filter
  })

  const onDataUpdate = useCallback(() => {
    refetch()
  }, [])

  return (
    <>
      <OrdersFilter
        defaultValue={filter}
        onChange={(v) => {
          setFilter(v)
          refetch()
        }}
      />
      <OrdersTableWithoutData orders={orders ?? []} />
    </>
  )
}

function getDefaultFilter(): GetOrdersOptions {
  let dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - 1)
  return {
    from: dateFrom,
    to: new Date()
  }
}
