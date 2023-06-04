import { memo } from 'react'
import { Order } from '../model/Order'
import OrdersTableRow from './OrdersTableRow'
import LoadingLine from '@/src/shared/ui/LoadingLine'

const OrdersTableRowMemo = memo(OrdersTableRow)

export interface OrdersTableFrameProps {
  orders: Order[]
  loading?: boolean
}

export default function OrdersTableFrame({ orders, loading }: OrdersTableFrameProps) {
  return (
    <div className="overflow-x-auto">
      <LoadingLine className={`${loading ? '' : 'opacity-0'}`} />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Run ID</th>
            <th>Status</th>
            <th>Operation</th>
            <th>Security Ticker</th>
            <th>Lots</th>
            <th>Price</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrdersTableRowMemo key={order.exchangeId} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
