import { OrderDetails } from "../../utils/orderDetails"
import { C_Order } from "../../../config/exchangeClientTypes"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<C_Order>
  buy({ ticker, lots, price }: OrderDetails): Promise<C_Order>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}
