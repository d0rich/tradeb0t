export type OrderOptions = {
    operation: "Buy" | "Sell"
    ticker: string
    lots: number
    price: number
}
