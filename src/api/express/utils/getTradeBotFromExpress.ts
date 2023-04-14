import { ITradeBot } from 'src/bot'
import { IExpressAppCarrier } from './IExpressAppCarrier'

export function getTradeBotFromExpress(expressAppCarrier: IExpressAppCarrier): ITradeBot {
  return expressAppCarrier.app.get('tradeBot')
}
