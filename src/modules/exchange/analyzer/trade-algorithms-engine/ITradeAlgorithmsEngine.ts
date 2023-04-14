import { TradeBot } from '../../../../TradeBot'
import { AbstractExchangeClient, AbstractTradeAlgorithm } from '../../../../abstract'
import { ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher } from '../../../index'
import { Algorithm, AlgorithmRun } from '../../../../db'

export interface ITradeAlgorithmsEngine {
  get description(): Algorithm[]
  runAlgorithm(name: string, inputs: unknown): Promise<AlgorithmRun>
  resumeAlgorithms(): Promise<void>
  continueAlgorithm(name: string, run_id: number): Promise<AlgorithmRun>
  stopAlgorithm(name: string, run_id: number): Promise<AlgorithmRun>
}
