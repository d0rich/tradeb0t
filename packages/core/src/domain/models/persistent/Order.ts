import { Entity, Column, ManyToOne, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { AlgorithmRun } from './AlgorithmRun'
import { dateTransformer } from 'src/storage'

/**
 * @see {@link https://support.tradeplusonline.com/support/solutions/articles/1000254592-what-are-the-different-order-status-possible-of-an-order- | What are the different order status possible of an order?}
 */
export enum EOrderStatus {
  NOT_PROCESSED = 'not_processed',
  TO_BE_PROCESSED = 'to_be_processed',
  PLACED = 'placed',
  UNITS_ALLOCATED = 'units_allocated',
  UNITS_REDEEMED = 'units_redeemed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  UNDEFINED = 'undefined'
}

/**
 * @see {@link EOrderStatus}
 */
export type OrderStatus = EOrderStatus | `${EOrderStatus}`

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

@Entity()
export class Order {
  @PrimaryColumn()
  exchangeId: string

  @Column()
  securityTicker: string

  @Column()
  status: OrderStatus = 'undefined'

  @Column()
  operation: OperationType = 'undefined'

  @Column('int')
  lots: number

  @Column('float')
  price: number

  @UpdateDateColumn({
    type: 'int',
    transformer: dateTransformer
  })
  updatedAt?: Date = new Date()

  @Column({ type: 'int', nullable: false })
  algorithmRunId?: number

  @ManyToOne(() => AlgorithmRun, (run) => run.orders)
  algorithmRun?: AlgorithmRun
}
