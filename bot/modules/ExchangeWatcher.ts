import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../TradeBot";
import { D_PortfolioPosition, D_Currency } from "@prisma/client";
import { C_Currency, C_Portfolio } from "../../types";
import { ExchangeClient } from "exchange";

export class ExchangeWatcher implements IExchangeWatcher{
    private readonly tradebot: TradeBot
    private get analyzer(): ExchangeAnalyzer { return this.tradebot.analyzer }
    private get trader(): ExchangeTrader { return this.tradebot.trader }
    private get exchangeClient(): ExchangeClient { return this.tradebot.exchangeClient }

    constructor(tradebot: TradeBot) {
        this.tradebot = tradebot
    }

    getRate(ticker: string) {
    }

    receiveOrderData(data: any) {
    }

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        const portfolio: C_Portfolio = await this.exchangeClient.getPortfolio()
        return portfolio.positions
        .map(position => {
            return {
                security_ticker: position.ticker || 'undefined',
                amount: position.balance
            }
        })
    }

    async getCurrencies(): Promise<D_Currency[]> {
        const currencies: C_Currency[] = await this.exchangeClient.infoModule.getCurrencies()
        return currencies.map(currency => ({
            name: currency,
            ticker: currency
        }))
    }

    async getSecurityName(ticker: string): Promise<string> {
        return await this.exchangeClient.infoModule.getSecurityName(ticker)
    }

    async getSecurityLastPrice(ticker: string): Promise<number> {
        return await this.exchangeClient.infoModule.getSecurityLastPrice(ticker)
    }

    async getSecurityCurrency(ticker: string): Promise<D_Currency> {
        const currency: C_Currency = await this.exchangeClient.infoModule.getSecurityCurrency(ticker)
        return {
            name: currency,
            ticker: currency
        }
    }
}
