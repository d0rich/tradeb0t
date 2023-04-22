import { Algorithm, InputTypes, AlgorithmRun } from 'src/domain'

export interface ITradeAlgorithm<InputsType = unknown, StateType = unknown> {
  get details(): Algorithm
  get name(): string
  get description(): string
  get inputs(): InputTypes
  main(inputs: InputsType): Promise<AlgorithmRun<InputsType, StateType>>
  resume(id: number): Promise<AlgorithmRun<InputsType, StateType>>
  stop(id: number): Promise<AlgorithmRun<InputsType, StateType>>
}
