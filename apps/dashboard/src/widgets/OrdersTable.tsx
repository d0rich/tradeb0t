import { useState, useEffect } from 'react'
import { trpc } from '@/src/shared/api/trpc'
import OrdersTableFrame from '@/src/entities/order/ui/OrdersTableFrame'
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

  useEffect(() => {
    const timer = setInterval(() => {
      refetch()
    }, 3000)
    return () => clearInterval(timer)
  }, [orders])

  return (
    <>
      <OrdersFilter
        defaultValue={filter}
        onChange={(v) => {
          setFilter({ ...v})
          refetch()
        }}
      />
      <OrdersTableFrame orders={orders ?? []} />
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
