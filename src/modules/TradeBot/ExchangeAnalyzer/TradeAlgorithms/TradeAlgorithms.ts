import { TradeBot } from "src/TradeBot";
import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "src/modules/TradeBot/index";
import { AbstractTradeAlgorithm } from "./AbstractTradeAlgorithm";
import { D_Algorithm, D_AlgorithmRun } from "@prisma/client";
import { initAlgorithms } from "../../../../../config/algorithms";

export class TradeAlgorithms{
    private readonly analyzer: ExchangeAnalyzer
    private get trader(): ExchangeTrader { return this.analyzer.trader }
    private get watcher(): ExchangeWatcher { return this.analyzer.watcher }
    private get tradebot(): TradeBot { return this.analyzer.tradebot }

    private readonly algorithms: AbstractTradeAlgorithm<any, any>[]

    constructor(analyzer: ExchangeAnalyzer) {
        this.analyzer = analyzer
        this.algorithms = initAlgorithms(analyzer)
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
            await algorithms.find(algo => algo.name === run.algorithm_name)?.continue(run.id)
        }
    }

}
