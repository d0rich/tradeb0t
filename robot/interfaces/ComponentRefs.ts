import {ExchangeTrader, ExchangeAnalyzer, ExchangeWatcher} from "../components";
import {TradeBot} from "../TradeBot";

export interface ITradeBotRef{
    _tradebot: TradeBot
}

export interface IWatcherRef extends ITradeBotRef{
    get watcher(): ExchangeWatcher
}

export interface IAnalyzerRef extends ITradeBotRef{
    get analyzer(): ExchangeAnalyzer
}

export interface ITraderRef extends ITradeBotRef{
    get trader(): ExchangeTrader
}
