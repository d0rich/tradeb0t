export * from '../../config/exchangeClientTypes'

export type OrderDetails = {
    operation: OperationType
    ticker: string
    lots: number
    price: number
}

export type OperationType = 'buy' | 'sell' | 'buy_or_cancel' | 'sell_or_cancel'
