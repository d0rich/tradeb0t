import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../../TradeBot";
import { D_PortfolioPosition, D_Currency, D_Operation, D_Instrument } from "@prisma/client";
import { C_Currency, C_Portfolio, C_Instrument } from "../../../config/exchangeClientTypes";
import { ExchangeClient } from "src/ExchangeClient";
import {initTranslators} from "../../../config/cdTranslators";

export class ExchangeWatcher {
    private readonly tradebot: TradeBot
    private readonly translators
    private get analyzer(): ExchangeAnalyzer { return this.tradebot.analyzer }
    private get trader(): ExchangeTrader { return this.tradebot.trader }
    private get exchangeClient(): ExchangeClient { return this.tradebot.exchangeClient }

    constructor(tradebot: TradeBot) {
        this.tradebot = tradebot
        this.translators = initTranslators(this, tradebot.exchangeClient)
    }

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        const { exchangeClient, translators } = this
        const portfolio: C_Portfolio = await exchangeClient.getPortfolio()
        return translators.portfolio(portfolio)
    }

    async getCurrencies(): Promise<D_Currency[]> {
        const { exchangeClient, translators } = this
        const currencies: C_Currency[] = await exchangeClient.infoModule.getCurrencies()
        return await Promise.all(currencies.map(c => translators.currency(c)))
    }

    async getInstrument(ticker: string): Promise<D_Instrument>{
        const { exchangeClient, translators } = this
        const instrument = await exchangeClient.infoModule.getInstrument(ticker)
        if (!instrument) throw new Error(`Instrument with ticker "${ticker}" was not found`)
        return translators.instrument(instrument)
    }

    async getInstrumentName(ticker: string): Promise<string> {
        const { exchangeClient } = this
        return await exchangeClient.infoModule.getInstrumentName(ticker)
    }

    async getInstrumentLastPrice(ticker: string): Promise<number> {
        const { exchangeClient } = this
        return await exchangeClient.infoModule.getInstrumentLastPrice(ticker)
    }

    async getInstrumentCurrency(ticker: string): Promise<D_Currency> {
        const { exchangeClient, translators } = this
        const currency: C_Currency = await exchangeClient.infoModule.getInstrumentCurrency(ticker)
        return translators.currency(currency)
    }

    async getOperations(from: Date = new Date(0), to: Date = new Date()): Promise<D_Operation[]>{
        const { exchangeClient, translators } = this
        const relevantOperations = await exchangeClient.infoModule.getOperationsAll(from, to)
        return translators.operations(relevantOperations
            .filter(operation => operation.operationType === "Buy" || operation.operationType === "Sell")
        )
    }

    async getOperationsByInstrument(ticker: string, from: Date = new Date(0), to: Date = new Date()): Promise<D_Operation[]>{
        const { exchangeClient, translators } = this
        const relevantOperations = await exchangeClient.infoModule.getOperationsByInstrument(ticker, from, to)
        return translators.operations(relevantOperations
            .filter(operation => operation.operationType === "Buy" || operation.operationType === "Sell")
        )
    }
}
