import OpenAPI, {
    Order,
    Portfolio,
    Currency,
    MarketInstrument,
    Operation, CurrencyPosition
} from "@tinkoff/invest-openapi-js-sdk";

export type C_ExchangeApi = OpenAPI
export type C_Order = Omit<Order, 'operation'> &
    { operation: 'Buy'| 'Sell' |
            'MarketBuy' | 'MarketSell' |
            'BuyOrCancel' | 'SellOrCancel' }
export type C_Portfolio = Portfolio
export type C_Currency = Currency
export type C_CurrencyBalance = CurrencyPosition
export type C_Security = MarketInstrument
export type C_Operation = Operation
