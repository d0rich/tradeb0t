import { OrderDetails } from "../../types"
import { C_Order } from "../../types/ExchangeApi.t"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<C_Order>
  buy({ ticker, lots, price }: OrderDetails): Promise<C_Order>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}