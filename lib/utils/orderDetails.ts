import { OperationType } from "./database";

export type OrderDetails = {
    operation: OperationType
    ticker: string
    lots: number
    price: number
}
