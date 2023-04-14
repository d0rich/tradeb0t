import { ITradeBot } from '../../../../ITradeBot'
import { IExpressAppCarrier } from './IExpressAppCarrier'

export function getTradeBotFromExpress(expressAppCarrier: IExpressAppCarrier): ITradeBot {
  return expressAppCarrier.app.get('tradeBot')
}
