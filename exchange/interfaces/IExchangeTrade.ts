import { OrderDetails } from "../../types"
import { PlacedOrder } from "../../types/ExchangeApi.t"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<PlacedOrder>
  buy({ ticker, lots, price }: OrderDetails): Promise<PlacedOrder>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}