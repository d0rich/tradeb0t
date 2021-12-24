import {IExchangeTrader} from "../interfaces";
import {ExchangeWatcher, ExchangeAnalyzer} from "./";

export class ExchangeTrader implements IExchangeTrader{
    analyzer: ExchangeAnalyzer;
    watcher: ExchangeWatcher;

    setExchangeAnalyzer(exchangeAnalyzer: ExchangeAnalyzer) {
        this.analyzer = exchangeAnalyzer
    }

    setExchangeWatcher(exchangeWatcher: ExchangeWatcher) {
        this.watcher = exchangeWatcher
    }

}
