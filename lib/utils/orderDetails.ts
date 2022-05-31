import { OperationType } from "./operation";

export type OrderDetails = {
    operation: OperationType
    ticker: string
    lots: number
    price: number
}
