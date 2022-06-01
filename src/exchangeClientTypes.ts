import OpenAPI, {
    Order,
    Portfolio,
    Currency,
    MarketInstrument,
    Operation
} from "@tinkoff/invest-openapi-js-sdk";

export type C_ExchangeApi = OpenAPI
export type C_Order = Omit<Order, 'operation'> & { operation: 'Buy'| 'Sell' | 'MarketBuy' | 'MarketSell' | 'BuyOrCancel' | 'SellOrCancel' }
export type C_Portfolio = Portfolio
export type C_Currency = Currency
export type C_Instrument = MarketInstrument
export type C_Operation = Operation
