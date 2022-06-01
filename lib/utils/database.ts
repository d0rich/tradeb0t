export type OperationType = 'buy' | 'sell' | 'buy_or_cancel' | 'sell_or_cancel'

export type OperationId = { exchange_id: string } | { created_at: Date }
export type OrderId = { exchange_id: string } | { created_at: Date }

export type GetOperationsOptions = {
    from?: Date,
    to?: Date,
    instrumentTicker?: string,
    operation?: OperationType
}

export type GetOrdersOptions = {
    from?: Date,
    to?: Date,
    instrumentTicker?: string,
    operation?: OperationType
}
