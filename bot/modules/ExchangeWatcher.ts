import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../TradeBot";
import { PortfolioPosition, Currency } from "@prisma/client";
import { RA_Currency, RA_Portfolio } from "../../types";

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
        const portfolio: RA_Portfolio = await this._tradebot.exchangeClient.portfolio()
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

    async getCurrencies(): Promise<Currency[]> {
        const currencies: RA_Currency[] = await this._tradebot.exchangeClient.infoModule.currencies()
        return currencies.map(currency => ({
            name: currency,
            ticker: currency
        }))
    }

    async getSecurityLastPrice(ticker: string): Promise<number> {
        return await this._tradebot.exchangeClient.infoModule.securityLastPrice(ticker) 
    }

    async getSecurityCurrency(ticker: string): Promise<Currency> {
        const currency: RA_Currency = await this._tradebot.exchangeClient.infoModule.securityCurrency(ticker)
        return {
            name: currency,
            ticker: currency
        }
    }
}
