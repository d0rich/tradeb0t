import { OperationType } from '../../../db'

export type CreateOrderOptions = {
  operation: OperationType
  ticker: string
  lots: number
  price: number
}
