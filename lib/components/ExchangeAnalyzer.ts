import {IExchangeAnalyzer} from "../interfaces";
import {ExchangeTrader, ExchangeWatcher} from "./";

export class ExchangeAnalyzer implements IExchangeAnalyzer{
    trader: ExchangeTrader;
    watcher: ExchangeWatcher;

    setExchangeTrader(exchangeTrader: ExchangeTrader) {
        this.trader = exchangeTrader
    }

    setExchangeWatcher(exchangeWatcher: ExchangeWatcher) {
        this.watcher = exchangeWatcher
    }

}
