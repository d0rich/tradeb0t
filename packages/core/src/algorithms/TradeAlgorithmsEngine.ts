import { ITradeAlgorithm } from 'src/algorithms'
import { ITradeAlgorithmsEngine } from './ITradeAlgorithmsEngine'
import { IExchangeTrader, IExchangeWatcher, IExchangeAnalyzer } from '../bot'
import { DomainTemplate, Algorithm, AlgorithmRun } from 'src/domain'
import { ITradeBot } from 'src/bot/ITradeBot'

export class TradeAlgorithmsEngine<Domain extends DomainTemplate, TExchangeApi> implements ITradeAlgorithmsEngine {
  get description(): Algorithm[] {
    return this.algorithms.map((algo) => algo.details)
  }

  protected readonly analyzer: IExchangeAnalyzer<Domain, TExchangeApi>

  protected get trader(): IExchangeTrader {
    return this.analyzer.trader
  }
  protected get watcher(): IExchangeWatcher {
    return this.analyzer.watcher
  }
  protected get tradebot(): ITradeBot<Domain, TExchangeApi> {
    return this.analyzer.tradebot
  }

  protected readonly algorithms: ITradeAlgorithm[]

  constructor(
    analyzer: IExchangeAnalyzer<Domain, TExchangeApi>,
    initAlgorithmsCallback: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[]
  ) {
    this.analyzer = analyzer
    this.algorithms = initAlgorithmsCallback(analyzer)
    this.resumeAlgorithms()
  }

  async runAlgorithm(name: string, inputs: unknown): Promise<AlgorithmRun> {
    const { algorithms } = this
    const algo = algorithms.find((a) => a.name === name)
    if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
    return await algo.main(inputs)
  }

  async resumeAlgorithms() {
    const { tradebot, analyzer, algorithms } = this
    const unfinishedRuns = await analyzer.storage.algorithmRuns.findAllUnfinished()
    for (const run of unfinishedRuns) {
      const resumedRun = await algorithms.find((algo) => algo.name === run.algorithmName)?.resume(run.id)
      if (resumedRun?.status === 'resumed')
        tradebot.logger.success('Algorithm is resumed: ', {
          name: resumedRun.algorithmName,
          run_id: resumedRun.id,
          state: resumedRun.state
        })
    }
    tradebot.logger.success('All algorithms are resumed')
  }

  async resumeAlgorithm(name: string, id: number): Promise<AlgorithmRun> {
    const { algorithms } = this
    const algo = algorithms.find((a) => a.name === name)
    if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
    return await algo.resume(id)
  }

  async stopAlgorithm(name: string, id: number): Promise<AlgorithmRun> {
    const { algorithms } = this
    const algo = algorithms.find((a) => a.name === name)
    if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
    return await algo.stop(id)
  }
}
