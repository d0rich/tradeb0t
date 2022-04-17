import { OrderDetails } from "../../types"
import { R_PlacedOrder } from "../../types/ExchangeApi.t"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<R_PlacedOrder>
  buy({ ticker, lots, price }: OrderDetails): Promise<R_PlacedOrder>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}