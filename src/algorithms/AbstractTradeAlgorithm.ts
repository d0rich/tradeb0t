import { DomainTemplate, AlgorithmRun, Algorithm, InputTypes } from 'src/domain'
import { ITradeAlgorithm } from './ITradeAlgorithm'
import { IExchangeWatcher, IExchangeAnalyzer, LoggerService, IExchangeTrader } from 'src/bot'

// TODO: fix types when interfaces for tradebot will be implemented
export abstract class AbstractTradeAlgorithm<
  Domain extends DomainTemplate,
  TExchangeApi = unknown,
  InputsType = unknown,
  StateType = unknown,
  StopDataType = unknown
> implements ITradeAlgorithm<InputsType, StateType>
{
  protected readonly analyzer: IExchangeAnalyzer<Domain, TExchangeApi>
  protected get watcher(): IExchangeWatcher<Domain> {
    return this.analyzer.watcher
  }
  protected get trader(): IExchangeTrader {
    return this.analyzer.trader
  }
  protected stopData: Map<number, StopDataType> = new Map<number, StopDataType>()
  private get logger(): LoggerService {
    return this.analyzer.tradebot.logger
  }
  get details(): Algorithm {
    return {
      name: this.name,
      description: this.description,
      inputTypes: this.inputs
    }
  }

  protected constructor(analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) {
    this.analyzer = analyzer
  }

  protected async fixStart(inputs: InputsType, state: StateType): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    const algoRun: AlgorithmRun = await analyzer.storage.algorithmRuns.runOne(name, inputs, state)
    logger.log({
      type: 'info',
      message: `Starting algorithm "${name}"`,
      algorithm: {
        name,
        inputs,
        state,
        run_id: algoRun.id
      }
    })
    return algoRun
  }

  protected async fixStop(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.log({
      type: 'info',
      message: `Stopping algorithm "${name}"`,
      algorithm: {
        name,
        run_id: id
      }
    })
    this.stopData.delete(id)
    return await analyzer.storage.algorithmRuns.stopOne(id)
  }

  protected async fixContinue(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.log({
      type: 'info',
      message: `Resuming algorithm "${name}"`,
      algorithm: {
        name,
        run_id: id
      }
    })
    return await analyzer.storage.algorithmRuns.resumeOne(id)
  }

  protected async fixFinish(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.log({
      type: 'info',
      message: `Finishing algorithm "${name}"`,
      algorithm: {
        name,
        run_id: id
      }
    })
    return await analyzer.storage.algorithmRuns.finishOne(id)
  }

  protected async fixError(id: number, error: Error): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    await this.stop(id)
    const run = await analyzer.storage.algorithmRuns.storeError(id, error)
    logger.log({
      type: 'error',
      message: `Error in algorithm "${name}"`,
      algorithm: {
        name,
        state: run.state,
        run_id: id
      }
    })
    return run
  }

  protected async saveProgress(id: number, progress: StateType): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.log({
      type: 'info',
      message: `Saving process of algorithm "${name}"`,
      algorithm: {
        name,
        state: progress,
        run_id: id
      }
    })
    return await analyzer.storage.algorithmRuns.saveProgress(id, progress)
  }

  protected async loadProgress(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    const algoRun: AlgorithmRun | null = await analyzer.storage.algorithmRuns.loadProgress(id)
    if (!algoRun) throw new Error(`[algo:${id}] Algorithm "${name}" was not found`)
    logger.log({
      type: 'info',
      message: `Loading progress of algorithm "${name}"`,
      algorithm: {
        name,
        state: algoRun?.state,
        run_id: id
      }
    })
    return algoRun
  }

  abstract get name(): string
  abstract get description(): string
  abstract get inputs(): InputTypes
  abstract main(inputs: InputsType): Promise<AlgorithmRun<InputsType, StateType>>
  abstract continue(id: number): Promise<AlgorithmRun<InputsType, StateType>>
  abstract stop(id: number): Promise<AlgorithmRun<InputsType, StateType>>
}
