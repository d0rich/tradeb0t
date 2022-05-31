import { C_Currency, C_Instrument, C_Operation } from "../../../src/exchangeClientTypes";
import {AbstractExchangeClient} from "../../AbstractExchangeClient";

export abstract class AbstractInfoModule {
  protected readonly exchangeClient: AbstractExchangeClient

  protected constructor(exchangeClient: AbstractExchangeClient){
    this.exchangeClient = exchangeClient
  }

  abstract getCurrencies(): Promise<C_Currency[]>

  abstract getInstrumentLastPrice(ticker: string): Promise<number>

  abstract getInstrumentCurrency(ticker: string): Promise<C_Currency>

  abstract getInstrumentName(ticker: string): Promise<string>

  abstract getOperationsAll(from: Date, to: Date): Promise<C_Operation[]>

  abstract getOperationsByInstrument(ticker: string, from: Date, to: Date): Promise<C_Operation[]>

  abstract getInstrument(ticker: string, ignoreCache: boolean): Promise<C_Instrument>

  abstract getInstrumentByExchangeId(id: string, ignoreCache: boolean): Promise<C_Instrument>
}
