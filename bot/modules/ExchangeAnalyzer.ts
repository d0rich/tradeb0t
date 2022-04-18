import {IExchangeAnalyzer} from "../interfaces";
import {ExchangeTrader, ExchangeWatcher} from ".";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import {TradeBot} from "../TradeBot";

import { Currency, PortfolioPosition, PrismaClient, Security } from "@prisma/client";
const db = new PrismaClient()

export class ExchangeAnalyzer implements IExchangeAnalyzer{
    private _tradebot: TradeBot;
    private _tradeAlgos: TradeAlgorithms = new TradeAlgorithms(this);

    constructor(tradebot: TradeBot) {
        this._tradebot = tradebot
    }

    get trader(): ExchangeTrader {
        return this._tradebot.trader
    }

    get watcher(): ExchangeWatcher {
        return this._tradebot.watcher
    }

    get tradeAlgos(): TradeAlgorithms {
        return this._tradeAlgos
    }

    async updatePortfolio(): Promise<PortfolioPosition[]>{
        const transactionFunction = async () => {
            await db.portfolioPosition.deleteMany()
            const relevantPortfolio = await this.watcher.getPortfolio()
            return relevantPortfolio.map(position => db.portfolioPosition.create({ data: position }))
        }
        return await db.$transaction(await transactionFunction())
        
    }

    async getPortfolio(): Promise<PortfolioPosition[]> {
        return db.portfolioPosition.findMany({})
    }

    async updateCurrencies(): Promise<Currency[]> {
        const transactionFunction = async () => {
            const relevantCurrencies = await this.watcher.getCurrencies()
            return relevantCurrencies
                .map(currency => db.currency.upsert({ where: {ticker: currency.ticker}, update: {}, create: currency }))
        }
        return await db.$transaction(await transactionFunction())
    }

    async getCurrencies(): Promise<Currency[]> {
        return await db.currency.findMany({})
    }

    async updateSecurities(): Promise<Security[]> {
        const transactionFunction = async () => {
            const portfolio: PortfolioPosition[] = await this.watcher.getPortfolio()
            const portfolioInfo = await Promise.all(
                portfolio.map(async (position) => {
                    return {
                        price: await this.watcher.getSecurityLastPrice(position.security_ticker),
                        currency: await this.watcher.getSecurityCurrency(position.security_ticker)
                    } 
                })
            )
            const promises = portfolio
                .map((position, index) => db.security.upsert({ 
                        where: { ticker: position.security_ticker },
                        update: {
                            price: portfolioInfo[index].price,
                        },
                        create: { 
                            name: position.security_ticker, 
                            price: portfolioInfo[index].price, 
                            ticker: position.security_ticker, 
                            currency_ticker: portfolioInfo[index].currency.ticker
                        }
                    })
                )
            return promises
        }
        return await db.$transaction(await transactionFunction())
    }

    async getSecurities(): Promise<Security[]> {
        return await db.security.findMany({})
    }
}
