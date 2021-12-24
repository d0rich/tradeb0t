import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {api} from "../../config/ExchangeApi";

export class ExchangeWatcher implements IExchangeWatcher{
    analyzer: ExchangeAnalyzer;
    trader: ExchangeTrader;

    setExchangeAnalyzer(exchangeAnalyzer: ExchangeAnalyzer) {
        this.analyzer = exchangeAnalyzer
    }

    setExchangeTrader(exchangeTrader: ExchangeTrader) {
        this.trader = exchangeTrader
    }

    getRate(ticker: string) {
    }

    receiveOrderData(data: any) {
    }

}
