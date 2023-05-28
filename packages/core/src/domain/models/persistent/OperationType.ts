export enum EOperationType {
  LIMIT_BUY = 'limit_buy',
  LIMIT_SELL = 'limit_sell',
  MARKET_BUY = 'market_buy',
  MARKET_SELL = 'market_sell',
  BUY_OR_CANCEL = 'buy_or_cancel',
  SELL_OR_CANCEL = 'sell_or_cancel',
  UNDEFINED = 'undefined'
}

export type OperationType = EOperationType | `${EOperationType}`
