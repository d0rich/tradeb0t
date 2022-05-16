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

    private get analyzer(): ExchangeAnalyzer {
        return this._tradebot.analyzer
    }

    private get trader(): ExchangeTrader {
        return this._tradebot.trader
    }

    getRate(ticker: string) {
    }

    receiveOrderData(data: any) {
    }

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        const portfolio: C_Portfolio = await this._tradebot.exchangeClient.getPortfolio()
        return portfolio.positions
        .map(position => {
            return {
                security_ticker: position.ticker || 'undefined',
                amount: position.balance
            }
        })
    }

    async getCurrencies(): Promise<D_Currency[]> {
        const currencies: C_Currency[] = await this._tradebot.exchangeClient.infoModule.getCurrencies()
        return currencies.map(currency => ({
            name: currency,
            ticker: currency
        }))
    }

    async getSecurityName(ticker: string): Promise<string> {
        return await this._tradebot.exchangeClient.infoModule.getSecurityName(ticker)
    }

    async getSecurityLastPrice(ticker: string): Promise<number> {
        return await this._tradebot.exchangeClient.infoModule.getSecurityLastPrice(ticker)
    }

    async getSecurityCurrency(ticker: string): Promise<D_Currency> {
        const currency: C_Currency = await this._tradebot.exchangeClient.infoModule.getSecurityCurrency(ticker)
        return {
            name: currency,
            ticker: currency
        }
    }
}
