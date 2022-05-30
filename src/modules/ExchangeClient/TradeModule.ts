import { ExchangeClient } from "../../ExchangeClient";
import { OrderDetails } from "../../utils";
import { C_Order } from "../../../config/exchangeClientTypes";

export class TradeModule {
  private readonly exchangeClient: ExchangeClient

  constructor(exchangeApi: ExchangeClient){
    this.exchangeClient = exchangeApi
  }

  public async sell({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    const { exchangeClient } = this
    // @ts-ignore
    const { figi } = await exchangeClient.api.searchOne({ ticker });
    const placedOrder = await exchangeClient.api.limitOrder({figi, operation: 'Sell', lots, price})
    return placedOrder
  }

  public async buy({ ticker, lots, price }: OrderDetails): Promise<C_Order> {
    const { exchangeClient } = this
    // @ts-ignore
    const { figi } = await exchangeClient.api.searchOne({ ticker });
    const placedOrder = await exchangeClient.api.limitOrder({figi, operation: 'Buy', lots, price})
    return placedOrder
  }

  public async sellOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

  public async buyOrCancel(): Promise<C_Order> {
    throw new Error("Method not implemented.");
  }

}
