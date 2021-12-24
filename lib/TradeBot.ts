import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./components";
import {ITraderRef, IAnalyzerRef, IWatcherRef} from "./interfaces";

export class TradeBot implements ITraderRef, IAnalyzerRef, IWatcherRef{
    analyzer: ExchangeAnalyzer;
    trader: ExchangeTrader;
    watcher: ExchangeWatcher;

    constructor() {
        this.setExchangeAnalyzer(new ExchangeAnalyzer())
        this.setExchangeTrader(new ExchangeTrader())
        this.setExchangeWatcher(new ExchangeWatcher())

        this.trader.setExchangeAnalyzer(this.analyzer)
        this.trader.setExchangeWatcher(this.watcher)

        this.watcher.setExchangeAnalyzer(this.analyzer)
        this.watcher.setExchangeTrader(this.trader)

        this.analyzer.setExchangeTrader(this.trader)
        this.analyzer.setExchangeWatcher(this.watcher)
    }

    setExchangeAnalyzer(exchangeAnalyzer: ExchangeAnalyzer) {
        this.analyzer = exchangeAnalyzer
    }

    setExchangeTrader(exchangeTrader: ExchangeTrader) {
        this.trader = exchangeTrader
    }

    setExchangeWatcher(exchangeWatcher: ExchangeWatcher) {
        this.watcher = exchangeWatcher
    }
}
