import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../TradeBot";
import { D_PortfolioPosition, D_Currency } from "@prisma/client";
import { C_Currency, C_Portfolio } from "../../types";

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

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        const portfolio: C_Portfolio = await this._tradebot.exchangeClient.portfolio()
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

    async getCurrencies(): Promise<D_Currency[]> {
        const currencies: C_Currency[] = await this._tradebot.exchangeClient.infoModule.currencies()
        return currencies.map(currency => ({
            name: currency,
            ticker: currency
        }))
    }

    async getSecurityName(ticker: string): Promise<string> {
        return await this._tradebot.exchangeClient.infoModule.securityName(ticker)
    }

    async getSecurityLastPrice(ticker: string): Promise<number> {
        return await this._tradebot.exchangeClient.infoModule.securityLastPrice(ticker) 
    }

    async getSecurityCurrency(ticker: string): Promise<D_Currency> {
        const currency: C_Currency = await this._tradebot.exchangeClient.infoModule.securityCurrency(ticker)
        return {
            name: currency,
            ticker: currency
        }
    }
}