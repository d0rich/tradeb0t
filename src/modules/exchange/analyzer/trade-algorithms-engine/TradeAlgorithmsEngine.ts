import { ITradeAlgorithm } from '../../../../abstract'
import { Algorithm, AlgorithmRun } from '../../../../db'
import { ITradeAlgorithmsEngine } from './ITradeAlgorithmsEngine'
import { IExchangeTrader } from '../../trader'
import { IExchangeWatcher } from '../../watcher'
import { IExchangeAnalyzer } from '../IExchangeAnalyzer'
import { DomainTemplate } from 'src/domain'
import { ITradeBot } from 'src/ITradeBot'

export class TradeAlgorithmsEngine<Domain extends DomainTemplate, TExchangeApi> implements ITradeAlgorithmsEngine {
  protected readonly analyzer: IExchangeAnalyzer<Domain, TExchangeApi>
  protected get trader(): IExchangeTrader {
    return this.analyzer.trader
  }
  protected get watcher(): IExchangeWatcher<Domain> {
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

  get description(): Algorithm[] {
    return this.algorithms.map((algo) => algo.details)
  }

  async runAlgorithm(name: string, inputs: unknown): Promise<AlgorithmRun> {
    const { algorithms } = this
    const algo = algorithms.find((a) => a.name === name)
    if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
    return await algo.main(inputs)
  }

  async resumeAlgorithms() {
    const { tradebot, analyzer, algorithms } = this
    const unfinishedRuns = await analyzer.getUnfinishedAlgorithmRuns()
    for (const run of unfinishedRuns) {
      const resumedRun = await algorithms.find((algo) => algo.name === run.algorithmName)?.continue(run.id)
      if (resumedRun)
        tradebot.logger.log({
          type: 'info',
          message: 'Algorithm is resumed',
          algorithm: {
            name: resumedRun.algorithmName,
            run_id: resumedRun.id,
            state: resumedRun.state
          }
        })
    }
    tradebot.logger.log({
      type: 'info',
      message: 'All algorithms are resumed'
    })
  }

  // TODO: rename to resume
  async continueAlgorithm(name: string, id: number): Promise<AlgorithmRun> {
    const { algorithms } = this
    const algo = algorithms.find((a) => a.name === name)
    if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
    return await algo.continue(id)
  }

  async stopAlgorithm(name: string, id: number): Promise<AlgorithmRun> {
    const { algorithms } = this
    const algo = algorithms.find((a) => a.name === name)
    if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
    return await algo.stop(id)
  }
}
