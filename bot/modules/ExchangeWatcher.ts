import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../TradeBot";
import { PortfolioPosition } from "@prisma/client";
import { R_Portfolio } from "../../types";

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

    async getPortfolio(): Promise<PortfolioPosition[]> {
        const portfolio: R_Portfolio = await this._tradebot.exchangeClient.portfolio()
        return portfolio.positions
        .map(position => {
            return {
                security_ticker: position.ticker || 'undefined',
                amount: position.balance,
                buy_date: new Date(0),
                buy_price: null
            }
        })
    }
}
