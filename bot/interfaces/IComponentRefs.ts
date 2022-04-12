import {ExchangeTrader, ExchangeAnalyzer, ExchangeWatcher} from "../modules";

export interface IWatcherRef{
    get watcher(): ExchangeWatcher
}

export interface IAnalyzerRef{
    get analyzer(): ExchangeAnalyzer
}

export interface ITraderRef{
    get trader(): ExchangeTrader
}
