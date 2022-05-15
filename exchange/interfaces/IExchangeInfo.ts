import { C_Portfolio, C_Currency } from "../../types";

export interface IExchangeInfo {
    getCurrencies(): Promise<C_Currency[]>

    getSecurityLastPrice(ticker: string): Promise<number>

    getSecurityCurrency(ticker: string): Promise<C_Currency>
}
