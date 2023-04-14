import { OperationType } from 'src/domain'

export type CreateOrderOptions = {
  operation: OperationType
  ticker: string
  lots: number
  price: number
}
