import {ExchangeTrader, ExchangeAnalyzer, ExchangeWatcher} from "../components";

export interface IWatcherRef {
    watcher: ExchangeWatcher
    setExchangeWatcher(exchangeWatcher: ExchangeWatcher)
}

export interface IAnalyzerRef {
    analyzer: ExchangeAnalyzer
    setExchangeAnalyzer(exchangeAnalyzer: ExchangeAnalyzer)
}

export interface ITraderRef {
    trader: ExchangeTrader
    setExchangeTrader(exchangeTrader: ExchangeTrader)
}
