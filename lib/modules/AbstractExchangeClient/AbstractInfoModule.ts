import { C_Currency, C_Security, C_Operation } from "../../../src/exchangeClientTypes";
import {AbstractExchangeClient} from "../../AbstractExchangeClient";

export abstract class AbstractInfoModule {
  protected readonly exchangeClient: AbstractExchangeClient

  protected constructor(exchangeClient: AbstractExchangeClient){
    this.exchangeClient = exchangeClient
  }

  abstract getCurrencies(): Promise<C_Currency[]>

  abstract getSecurityLastPrice(ticker: string): Promise<number>

  abstract getSecurityCurrency(ticker: string): Promise<C_Currency>

  abstract getSecurityName(ticker: string): Promise<string>

  abstract getSecurity(ticker: string, ignoreCache: boolean): Promise<C_Security | null>

  abstract getSecurityByExchangeId(id: string, ignoreCache: boolean): Promise<C_Security | null>
}
