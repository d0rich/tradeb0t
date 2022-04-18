import { OrderDetails } from "../../types"
import { C_PlacedOrder } from "../../types/ExchangeApi.t"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<C_PlacedOrder>
  buy({ ticker, lots, price }: OrderDetails): Promise<C_PlacedOrder>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}