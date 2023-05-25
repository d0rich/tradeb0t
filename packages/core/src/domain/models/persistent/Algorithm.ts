import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { AlgorithmRun } from './AlgorithmRun'

export enum EInputType {
  STRING = 'string',
  NUMBER = 'number',
  ORDER_DETAILS = 'OrderDetails',
  DATE = 'Date'
}

export type InputTypes = Record<string, EInputType | `${EInputType}`>

@Entity()
export class Algorithm {
  @PrimaryColumn('text')
  name: string

  @Column('text')
  description: string

  @Column('simple-json')
  inputTypes: InputTypes

  @OneToMany(() => AlgorithmRun, (run) => run.algorithm)
  algorithmRuns?: AlgorithmRun[]
}
