import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Algorithm } from './Algorithm'
import { Order } from './Order'
import { dateTransformer } from './transformers'

export type AlgorithmRunStatus = 'running' | 'stopped' | 'resumed' | 'finished' | 'error'

@Entity()
// FIXME: remove any (requires adding type checks in dependencies)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AlgorithmRun<InputType = any, StateType = InputType> {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  algorithmName: string

  @Column({
    type: 'simple-json',
    default: '{}'
  })
  inputs: InputType

  @Column('text')
  status: AlgorithmRunStatus

  @Column({
    type: 'simple-json',
    default: '{}'
  })
  state: StateType

  @UpdateDateColumn({
    type: 'int',
    transformer: dateTransformer
  })
  updatedAt: Date

  @CreateDateColumn({
    type: 'int',
    transformer: dateTransformer
  })
  createdAt: Date

  @ManyToOne(() => Algorithm, (algo) => algo.algorithmRuns)
  algorithm: Algorithm

  @OneToMany(() => Order, (order) => order.algorithmRun)
  orders: Order[]
}
