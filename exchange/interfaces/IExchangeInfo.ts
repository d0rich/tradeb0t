import { RA_Portfolio, RA_Currency } from "../../types";

export interface IExchangeInfo {
  currencies(): Promise<RA_Currency[]>
  securityLastPrice(ticker: string): Promise<number>
  securityCurrency(ticker: string): Promise<RA_Currency>
}