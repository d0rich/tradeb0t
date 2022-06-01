import { ExchangeClient } from "./ExchangeClient";
import { OrderDetails } from "../../lib/utils";
import { C_Order } from "../exchangeClientTypes";
import {AbstractTradeModule} from "../../lib/modules";

export class TradeModule extends AbstractTradeModule{

  constructor(exchangeClient: ExchangeClient){
    super(exchangeClient)
  }

  public async sell({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    const { exchangeClient } = this
    // @ts-ignore
    const { figi } = await exchangeClient.api.searchOne({ ticker });
    const placedOrder = await exchangeClient.api.limitOrder({figi, operation: 'Sell', lots, price})
    return {
      figi,
      operation: placedOrder.operation,
      price,
      status: placedOrder.status,
      orderId: placedOrder.orderId,
      requestedLots: placedOrder.requestedLots,
      type: "Limit",
      executedLots: placedOrder.executedLots
    }
  }

  public async buy({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    const { exchangeClient } = this
    // @ts-ignore
    const { figi } = await exchangeClient.api.searchOne({ ticker });
    const placedOrder = await exchangeClient.api.limitOrder({figi, operation: 'Buy', lots, price})
    return {
      figi,
      operation: placedOrder.operation,
      price,
      status: placedOrder.status,
      orderId: placedOrder.orderId,
      requestedLots: placedOrder.requestedLots,
      type: "Limit",
      executedLots: placedOrder.executedLots
    }
  }

  public async sellOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

  public async buyOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

}
