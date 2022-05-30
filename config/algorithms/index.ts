import {
    AbstractTradeAlgorithm
} from "src/modules/TradeBot";
import {SlicingAlgorithm} from "./SlicingAlgorithms";
import {ExchangeAnalyzer} from "src/modules/TradeBot";

export function initAlgorithms(analyzer: ExchangeAnalyzer): AbstractTradeAlgorithm<any, any>[] {
    return [
        new SlicingAlgorithm(analyzer)
    ]
}
