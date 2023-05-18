import { DomainTemplate, AlgorithmRun, Algorithm, InputTypes } from 'src/domain'
import { ITradeAlgorithm } from './ITradeAlgorithm'
import { IExchangeWatcher, IExchangeAnalyzer, LoggerService, IExchangeTrader } from 'src/bot'

export abstract class AbstractTradeAlgorithm<
  Domain extends DomainTemplate,
  TExchangeApi = unknown,
  InputsType = unknown,
  StateType = unknown,
  StopStateType = unknown
> implements ITradeAlgorithm<InputsType, StateType>
{
  abstract get name(): string
  abstract get description(): string
  abstract get inputs(): InputTypes
  abstract main(inputs: InputsType): Promise<AlgorithmRun<InputsType, StateType>>
  abstract resume(id: number): Promise<AlgorithmRun<InputsType, StateType>>
  abstract stop(id: number): Promise<AlgorithmRun<InputsType, StateType>>

  get details(): Algorithm {
    return {
      name: this.name,
      description: this.description,
      inputTypes: this.inputs
    }
  }

  protected stopState: Map<number, StopStateType> = new Map<number, StopStateType>()

  protected get watcher(): IExchangeWatcher {
    return this.analyzer.watcher
  }
  protected get trader(): IExchangeTrader {
    return this.analyzer.trader
  }

  private get logger(): LoggerService {
    return this.analyzer.tradebot.logger
  }

  constructor(protected readonly analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) {}

  protected async commitStart(inputs: InputsType, state: StateType): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    const algoRun: AlgorithmRun = await analyzer.storage.algorithmRuns.runOne(name, inputs, state)
    logger.start(`Starting algorithm "${name}": `, {
      name,
      inputs,
      state,
      run_id: algoRun.id
    })
    return algoRun
  }

  protected async commitStop(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.success(`Stopping algorithm "${name}": `, {
      name,
      run_id: id
    })
    this.stopState.delete(id)
    return await analyzer.storage.algorithmRuns.stopOne(id)
  }

  protected async commitContinue(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.start(`Resuming algorithm "${name}": `, {
      name,
      run_id: id
    })
    return await analyzer.storage.algorithmRuns.resumeOne(id)
  }

  protected async commitFinish(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.success(`Finishing algorithm "${name}": `, {
      name,
      run_id: id
    })
    return await analyzer.storage.algorithmRuns.finishOne(id)
  }

  protected async commitError(id: number, error: Error): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    await this.stop(id)
    const run = await analyzer.storage.algorithmRuns.storeError(id, error)
    logger.fail(`Error in algorithm "${name}": `, {
      name,
      state: run.state,
      run_id: id
    })
    return run
  }

  protected async saveProgress(id: number, progress: StateType): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.info(`Saving process of algorithm "${name}": `, {
      name,
      state: progress,
      run_id: id
    })
    return await analyzer.storage.algorithmRuns.saveProgress(id, progress)
  }

  protected async loadProgress(id: number): Promise<AlgorithmRun> {
    const { name, analyzer, logger } = this
    const algoRun: AlgorithmRun | null = await analyzer.storage.algorithmRuns.loadProgress(id)
    if (!algoRun) throw new Error(`[algo:${id}] Algorithm "${name}" was not found`)
    logger.start(`Loading progress of algorithm "${name}": `, {
      name,
      state: algoRun?.state,
      run_id: id
    })
    return algoRun
  }
}
