import { Application } from "express";
import { TradeBot } from "src/TradeBot";

interface IExpressAppCarrier {
  app: Application
}

export function tradeBot(expressAppCarrier: IExpressAppCarrier): TradeBot {
  return expressAppCarrier.app.get('tradeBot')
}
