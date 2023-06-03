import { Order } from '../model/Order'

export interface OrdersTableRowProps {
  order: Order
}

export default function OrdersTableRow({ order }: OrdersTableRowProps) {
  return (
    <tr>
      <td>{order.exchangeId}</td>
      <td>{order.algorithmRunId}</td>
      <td>{order.status}</td>
      <td>{order.operation}</td>
      <td>{order.securityTicker}</td>
      <td>{order.lots}</td>
      <td>{order.price}</td>
      <td>{order.updatedAt}</td>
    </tr>
  )
}
