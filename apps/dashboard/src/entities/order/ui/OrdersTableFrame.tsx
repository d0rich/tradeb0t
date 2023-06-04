import { Order } from '../model/Order'
import OrdersTableRow from './OrdersTableRow'

export interface OrdersTableFrameProps {
  orders: Order[]
}

export default function OrdersTableFrame({ orders }: OrdersTableFrameProps) {
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
