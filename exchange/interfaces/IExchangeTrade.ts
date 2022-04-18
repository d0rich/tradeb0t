import { OrderDetails } from "../../types"
import { RA_PlacedOrder } from "../../types/ExchangeApi.t"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<RA_PlacedOrder>
  buy({ ticker, lots, price }: OrderDetails): Promise<RA_PlacedOrder>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}