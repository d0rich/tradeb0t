import {
    AbstractTradeAlgorithm
} from "lib/modules/TradeBot";
import {SlicingAlgorithm} from "./SlicingAlgorithm";
import {ExchangeAnalyzer} from "lib/modules/TradeBot";
import {HammerAlgorithm} from "./HammerAlgorithm";

export function initAlgorithms(analyzer: ExchangeAnalyzer): AbstractTradeAlgorithm<any, any>[] {
    return [
        new SlicingAlgorithm(analyzer),
        new HammerAlgorithm(analyzer)
    ]
}
