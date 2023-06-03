import { useCallback } from 'react'
import { trpc } from '@/src/shared/api/trpc'
import OrdersTableWithoutData from '@/src/entities/order/ui/OrdersTable'

export interface OrdersTableProps {
  botUrl: string
}

export default function OrdersTable({ botUrl }: OrdersTableProps) {
  const { data: orders, refetch } = trpc.control.orders.search.useQuery({
    url: botUrl,
    options: {}
  })

  const onDataUpdate = useCallback(() => {
    refetch()
  }, [])

  return (
    <>
      <OrdersTableWithoutData orders={orders ?? []} />
    </>
  )
}
