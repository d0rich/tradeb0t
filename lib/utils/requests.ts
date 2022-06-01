import { IncomingHttpHeaders } from "http";
import { Application } from "express";
import { TradeBot } from "lib/TradeBot";

export interface IHttpHeadersCarrier {
    headers: IncomingHttpHeaders
}

interface IExpressAppCarrier {
    app: Application
}

export function getTradeBotFromExpress(expressAppCarrier: IExpressAppCarrier): TradeBot {
    return expressAppCarrier.app.get('tradeBot')
}
