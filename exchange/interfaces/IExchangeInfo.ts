import { R_Portfolio, R_Currency } from "../../types";

export interface IExchangeInfo {
  currencies(): Promise<R_Currency[]>
  securityLastPrice(ticker: string): Promise<number>
  securityCurrency(ticker: string): Promise<R_Currency>
}