import {ExchangeAnalyzer} from "../lib/components";

export class TradeAlgorithms{
    _analyzer: ExchangeAnalyzer;

    constructor(analyzer: ExchangeAnalyzer) {
        this._analyzer = analyzer
    }
}
