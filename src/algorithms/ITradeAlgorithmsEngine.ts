import { Algorithm, AlgorithmRun } from '../db'

export interface ITradeAlgorithmsEngine {
  get description(): Algorithm[]
  runAlgorithm(name: string, inputs: unknown): Promise<AlgorithmRun>
  resumeAlgorithms(): Promise<void>
  continueAlgorithm(name: string, run_id: number): Promise<AlgorithmRun>
  stopAlgorithm(name: string, run_id: number): Promise<AlgorithmRun>
}
