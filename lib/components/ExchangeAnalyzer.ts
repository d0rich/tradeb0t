import {IExchangeAnalyzer} from "../interfaces";
import {ExchangeTrader, ExchangeWatcher} from "./";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";

export class ExchangeAnalyzer implements IExchangeAnalyzer{
    trader: ExchangeTrader;
    watcher: ExchangeWatcher;
    tradeAlgos: TradeAlgorithms = new TradeAlgorithms(this);

    setExchangeTrader(exchangeTrader: ExchangeTrader) {
        this.trader = exchangeTrader
    }

    setExchangeWatcher(exchangeWatcher: ExchangeWatcher) {
        this.watcher = exchangeWatcher
    }

}
