import { D_AlgorithmRun, D_Algorithm } from "@prisma/client";
import { BotLogger, ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher } from "bot/modules";
import { TradeBot } from "bot/TradeBot";

export abstract class AbstractTradeAlgorithm{
  private readonly analyzer: ExchangeAnalyzer
  protected get watcher(): ExchangeWatcher { return this.analyzer.watcher }
  protected get trader(): ExchangeTrader { return this.analyzer.trader }
  private get logger(): BotLogger { return this.analyzer.tradebot.logger }
  get details(): D_Algorithm {
    return {
      name: this.name,
      description: this.description,
      input_types: JSON.stringify(this.inputs)
    }
  }

  constructor(analyzer: ExchangeAnalyzer){
    this.analyzer = analyzer
  }


  protected async start(inputs: any, state: any = inputs): Promise<D_AlgorithmRun> {
    const { name, analyzer, logger } = this
    const algoRun: D_AlgorithmRun = await analyzer.runAlgorithm(name, inputs, state)
    logger.log(`Starting algorithm ${name}:${algoRun.id}. Inputs: ${JSON.stringify(inputs)}`)
    return algoRun
  }
  protected async saveProgress(id: number, progress: any): Promise<D_AlgorithmRun> {
    const { name, analyzer, logger } = this
    logger.log(`Saving process of algorithm ${name}:${id}. State: ${JSON.stringify(progress)}`)
    return await analyzer.saveAlgorithmRunProgress(id, progress)
  }
  protected async loadProgress(id: number): Promise<D_AlgorithmRun> {
    const { name, analyzer, logger } = this
    const algoRun: D_AlgorithmRun | null = await analyzer.loadAlgorithmRunProgress(id)
    if (!algoRun) throw new Error(`Algorithm ${name}:${id} was not found`)
    logger.log(`Loading progress of algorithm ${name}:${id}. State: ${JSON.stringify(algoRun?.state)}`)
    return algoRun
  }
  protected async finish(id: number): Promise<D_AlgorithmRun>{
    const { name, analyzer, logger } = this
    logger.log(`Finishing algorithm ${name}:${id}`)
    return await analyzer.finishAlgorithmRun(id)
  }

  abstract get name(): string
  abstract get description(): string
  abstract get inputs(): any
  abstract main(inputs: any): Promise<D_AlgorithmRun>
  abstract continue(id: number): Promise<D_AlgorithmRun>
}