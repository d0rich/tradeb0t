import { useState, useEffect } from 'react'
import { trpc } from '@/src/shared/api/trpc'
import OrdersTableFrame from '@/src/entities/order/ui/OrdersTableFrame'
import OrdersFilter from '@/src/features/order/ui/OrdersFilter'
import type { GetOrdersOptions } from '@tradeb0t/core'
import { usePushNotification } from '@/src/shared/hooks'
import { failedQueryNotification } from '@/src/shared/notifications/failedQueryNotification'

export interface OrdersTableProps {
  botUrl: string
}

export default function OrdersTable({ botUrl }: OrdersTableProps) {
  const [filter, setFilter] = useState<GetOrdersOptions>(getDefaultFilter())
  const pushNotification = usePushNotification()
  const {
    data: orders,
    refetch,
    isLoading,
    isFetching,
    isError
  } = trpc.control.orders.search.useQuery({
    url: botUrl,
    options: filter
  })

  if (isError) {
    pushNotification(failedQueryNotification('trpc.control.orders.search'))
  }

  // TODO: use socket to refetch
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
          setFilter({ ...v })
          refetch()
        }}
      />
      <OrdersTableFrame loading={isLoading || isFetching} orders={orders ?? []} />
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
