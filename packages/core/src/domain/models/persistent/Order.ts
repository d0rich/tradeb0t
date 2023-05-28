import { Entity, Column, ManyToOne, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { AlgorithmRun } from './AlgorithmRun'
import { dateTransformer } from 'src/storage'
import { OrderStatus } from './OrderStatus'
import { OperationType } from './OperationType'

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
