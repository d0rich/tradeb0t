import { D_AlgorithmRun, D_Algorithm } from "@prisma/client";
import { ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher } from "bot/modules";
import { TradeBot } from "bot/TradeBot";

export abstract class AbstractTradeAlgorithm{
  private readonly analyzer: ExchangeAnalyzer
  protected get watcher(): ExchangeWatcher { return this.analyzer.watcher }
  protected get trader(): ExchangeTrader { return this.analyzer.trader }
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
    const { analyzer } = this
    return await analyzer.runAlgorithm(this.name, inputs, state)
  }
  protected async saveProgress(id: number, progress: any): Promise<D_AlgorithmRun> {
    const { analyzer } = this
    return await analyzer.saveAlgorithmRunProgress(id, progress)
  }
  protected async loadProgress(id: number): Promise<D_AlgorithmRun | null> {
    const { analyzer } = this
    return await analyzer.loadAlgorithmRunProgress(id)
  }
  protected async finish(id: number): Promise<D_AlgorithmRun>{
    const { analyzer } = this
    return await analyzer.finishAlgorithmRun(id)
  }

  abstract get name(): string
  abstract get description(): string
  abstract get inputs(): any
  abstract main(inputs: any): Promise<D_AlgorithmRun>
  abstract continue(id: number): Promise<D_AlgorithmRun>
}