import { Request } from "express";
import { TradeBot } from "bot/TradeBot";

export function tradeBot(expressRequest: Request): TradeBot {
  return expressRequest.app.get('tradeBot')
}