import { C_Portfolio, C_Currency } from "../../types";

export interface IExchangeInfo {
  currencies(): Promise<C_Currency[]>
  securityLastPrice(ticker: string): Promise<number>
  securityCurrency(ticker: string): Promise<C_Currency>
}