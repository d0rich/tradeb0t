import { Algorithm, InputTypes, AlgorithmRun } from 'src/domain'

export interface ITradeAlgorithm<InputsType = unknown, StateType = unknown> {
  get name(): string
  get description(): string
  get inputs(): InputTypes
  get details(): Algorithm
  main(inputs: InputsType): Promise<AlgorithmRun<InputsType, StateType>>
  resume(id: number): Promise<AlgorithmRun<InputsType, StateType>>
  stop(id: number): Promise<AlgorithmRun<InputsType, StateType>>
}
