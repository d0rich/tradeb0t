import {IExchangeAnalyzer} from "../interfaces";
import {ExchangeTrader, ExchangeWatcher} from ".";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import {TradeBot} from "../TradeBot";

import { D_Currency, D_PortfolioPosition, PrismaClient, D_Security, D_FollowedSecurity, D_Operation } from "@prisma/client";
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

    // Currencies

    async updateCurrencies(): Promise<D_Currency[]> {
        const transactionFunction = async () => {
            const relevantCurrencies = await this.watcher.getCurrencies()
            return relevantCurrencies
                .map(currency => db.d_Currency.upsert({ where: {ticker: currency.ticker}, update: {}, create: currency }))
        }
        return await db.$transaction(await transactionFunction())
    }

    async getCurrencies(): Promise<D_Currency[]> {
        return await db.d_Currency.findMany({})
    }

    // Securities

    async updateSecurities(): Promise<D_Security[]> {
        const transactionFunction = async () => {
            const portfolio: D_PortfolioPosition[] = await this.watcher.getPortfolio()
            const portfolioInfo = await Promise.all(
                portfolio.map(async (position) => {
                    return {
                        name: await this.watcher.getSecurityName(position.security_ticker),
                        price: await this.watcher.getSecurityLastPrice(position.security_ticker),
                        currency: await this.watcher.getSecurityCurrency(position.security_ticker)
                    } 
                })
            )
            const promises = portfolio
                .map((position, index) => db.d_Security.upsert({ 
                        where: { ticker: position.security_ticker },
                        update: {
                            price: portfolioInfo[index].price,
                        },
                        create: { 
                            name: portfolioInfo[index].name, 
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

    async getSecurities(): Promise<D_Security[]> {
        return await db.d_Security.findMany({})
    }

    addSecurities(...securities: D_Security[]): Promise<D_Security[]> {
        throw new Error("Method not implemented.");
    }

    // Followed Securities

    getFollowedSecurities(): D_FollowedSecurity[] {
        throw new Error("Method not implemented.");
    }
    followSecurity(): D_FollowedSecurity {
        throw new Error("Method not implemented.");
    }
    unfollowSecurity(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    updateFollowedSecurities(): D_Security[] {
        throw new Error("Method not implemented.");
    }

    // Portfolio

    async updatePortfolio(): Promise<D_PortfolioPosition[]>{
        const transactionFunction = async () => {
            await db.d_PortfolioPosition.deleteMany()
            const relevantPortfolio = await this.watcher.getPortfolio()
            return relevantPortfolio.map(position => db.d_PortfolioPosition.create({ data: position }))
        }
        return await db.$transaction(await transactionFunction())
        
    }

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        return db.d_PortfolioPosition.findMany({})
    }

    clearPortfolio(): Promise<null> {
        throw new Error("Method not implemented.");
    }
    addPortfolioPosition(): Promise<D_PortfolioPosition> {
        throw new Error("Method not implemented.");
    }
    removePortfolioPosition(): Promise<D_PortfolioPosition | null> {
        throw new Error("Method not implemented.");
    }
    getPositionAverageBuyPrice(ticker: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    // Operations

    addOperation(): Promise<D_Operation> {
        throw new Error("Method not implemented.");
    }
    updateOperation(): Promise<D_Operation> {
        throw new Error("Method not implemented.");
    }
    updateOperationsAll(): Promise<D_Operation[]> {
        throw new Error("Method not implemented.");
    }
    updateOperationsBySecurity(): Promise<D_Operation[]> {
        throw new Error("Method not implemented.");
    }
    getOperations(): Promise<D_Operation[]> {
        throw new Error("Method not implemented.");
    }

    
}
