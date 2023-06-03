import { Order } from '../model/Order'
import OrdersTableRow from './OrdersTableRow'

export interface OrdersTableProps {
  orders: Order[]
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
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
            <OrdersTableRow key={order.exchangeId} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
