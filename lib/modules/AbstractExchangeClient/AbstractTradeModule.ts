import { OrderDetails } from "../../utils";
import { C_Order } from "../../../src/exchangeClientTypes";
import {AbstractExchangeClient} from "../../AbstractExchangeClient";

export abstract class AbstractTradeModule {
  protected readonly exchangeClient: AbstractExchangeClient

  protected constructor(exchangeClient: AbstractExchangeClient){
    this.exchangeClient = exchangeClient
  }

  abstract sell({ ticker, lots, price }: OrderDetails): Promise<C_Order>

  abstract buy({ ticker, lots, price }: OrderDetails): Promise<C_Order>

  abstract marketSell({ ticker, lots }: OrderDetails): Promise<C_Order>

  abstract marketBuy({ ticker, lots }: OrderDetails): Promise<C_Order>

  abstract sellOrCancel(): Promise<C_Order>

  abstract buyOrCancel(): Promise<C_Order>

}
