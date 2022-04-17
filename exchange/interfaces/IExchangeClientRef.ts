import { ExchangeClient } from "..";

export interface IExchangeClientRef {
  get exchangeApi(): ExchangeClient
}