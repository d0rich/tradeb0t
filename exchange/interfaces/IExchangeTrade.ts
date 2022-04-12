import { PlacedLimitOrder } from "@tinkoff/invest-openapi-js-sdk"
import { OrderDetails } from "../../types"

export interface IExchangeTrade {
  sell({ ticker, lots, price }: OrderDetails): Promise<PlacedLimitOrder>
  buy({ ticker, lots, price }: OrderDetails): Promise<PlacedLimitOrder>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}