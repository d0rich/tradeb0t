import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../TradeBot";

export class ExchangeWatcher implements IExchangeWatcher{
    private _tradebot: TradeBot;

    constructor(tradebot: TradeBot) {
        this._tradebot = tradebot
    }

    get analyzer(): ExchangeAnalyzer {
        return this._tradebot.analyzer
    }

    get trader(): ExchangeTrader {
        return this._tradebot.trader
    }

    getRate(ticker: string) {
    }

    receiveOrderData(data: any) {
    }
}
