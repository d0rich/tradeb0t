import { Algorithm } from '../db'
import { InputTypes } from '../db/Algorithm'
import { AlgorithmRun } from '../db/AlgorithmRun'

export interface ITradeAlgorithm<
  InputsType = unknown,
  StateType = unknown
> {
  get details(): Algorithm
  get name(): string
  get description(): string
  get inputs(): InputTypes
  main(inputs: InputsType): Promise<AlgorithmRun<InputsType, StateType>>
  continue(id: number): Promise<AlgorithmRun<InputsType, StateType>>
  stop(id: number): Promise<AlgorithmRun<InputsType, StateType>>
}
