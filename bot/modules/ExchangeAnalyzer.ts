import {IExchangeAnalyzer} from "../interfaces";
import {ExchangeTrader, ExchangeWatcher} from ".";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import {TradeBot} from "../TradeBot";

import { PortfolioPosition, PrismaClient } from "@prisma/client";
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

    async updatePortfolio(){
        const transactionFunction = async () => {
            db.portfolioPosition.deleteMany({})
            const relevantPortfolio = await this.watcher.getPortfolio()
            return relevantPortfolio.map(position => db.portfolioPosition.create({ data: position }))
        }
        return await db.$transaction(await transactionFunction())
        
    }

    async getPortfolio(): Promise<PortfolioPosition[]> {
        return db.portfolioPosition.findMany({})
    }
}
