import { TradeBot } from "bot/TradeBot";
import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "bot/modules";
import { AbstractTradeAlgorithm } from "./AbstractTradeAlgorithm";
import { SlicingAlgorithm } from "./SlicingAlgorithms";
import { D_Algorithm, D_AlgorithmRun } from "@prisma/client";

export class TradeAlgorithms{
    private readonly analyzer: ExchangeAnalyzer
    private get trader(): ExchangeTrader { return this.analyzer.trader }
    private get watcher(): ExchangeWatcher { return this.analyzer.watcher }
    private get tradebot(): TradeBot { return this.analyzer.tradebot }
    
    private readonly algorithms: AbstractTradeAlgorithm[]

    constructor(analyzer: ExchangeAnalyzer) {
        this.analyzer = analyzer
        this.algorithms = [
            new SlicingAlgorithm(analyzer)
        ]
        this.continueAlgorithms()
    }

    get description(): D_Algorithm[] {
        return this.algorithms.map(algo => algo.details)
    }

    async runAlgorithm(name: string, inputs: any): Promise<D_AlgorithmRun>{
        const { algorithms } = this
        const algo = algorithms.find(a => a.name === name)
        if (!algo) throw new Error(`Algorithm with name "${name}" was not found`)
        return await algo.main(inputs)
    }

    async continueAlgorithms(){
        const { tradebot, analyzer, algorithms } = this
        tradebot.logger.log('Continue stopped algorithms runs...')
        const unfinishedRuns = await analyzer.getUnfinishedAlgorithmRuns()
        for (let run of unfinishedRuns){
            tradebot.logger.log(`Continue run ${run.id} ...`)
            await algorithms.find(algo => algo.name === run.algorithm_name)?.continue(run.id)
        }
    }

}
