import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";

export class ExchangeWatcher implements IExchangeWatcher{
    analyzer: ExchangeAnalyzer;
    trader: ExchangeTrader;

    setExchangeAnalyzer(exchangeAnalyzer: ExchangeAnalyzer) {
        this.analyzer = exchangeAnalyzer
    }

    setExchangeTrader(exchangeTrader: ExchangeTrader) {
        this.trader = exchangeTrader
    }

}
