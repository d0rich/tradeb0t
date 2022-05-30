import { C_Portfolio, C_Currency } from "../../types";

export interface IExchangeInfo {
    getCurrencies(): Promise<C_Currency[]>

    getInstrumentLastPrice(ticker: string): Promise<number>

    getInstrumentCurrency(ticker: string): Promise<C_Currency>
}
