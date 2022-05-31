import {
    AbstractTradeAlgorithm
} from "lib/modules/TradeBot";
import {SlicingAlgorithm} from "./SlicingAlgorithms";
import {ExchangeAnalyzer} from "lib/modules/TradeBot";

export function initAlgorithms(analyzer: ExchangeAnalyzer): AbstractTradeAlgorithm<any, any>[] {
    return [
        new SlicingAlgorithm(analyzer)
    ]
}
