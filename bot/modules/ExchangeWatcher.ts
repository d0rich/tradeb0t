import {IExchangeWatcher} from "../interfaces";
import {ExchangeAnalyzer, ExchangeTrader} from "./index";
import {TradeBot} from "../TradeBot";
import { D_PortfolioPosition, D_Currency, D_Operation, D_Instrument } from "@prisma/client";
import { C_Currency, C_Portfolio, C_Instrument, OperationType } from "../../types";
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
        const { exchangeClient } = this
        const portfolio: C_Portfolio = await exchangeClient.getPortfolio()
        return portfolio.positions
        .map(position => {
            return {
                instrument_ticker: position.ticker || 'undefined',
                amount: position.balance
            }
        })
    }

    async getCurrencies(): Promise<D_Currency[]> {
        const { exchangeClient } = this
        const currencies: C_Currency[] = await exchangeClient.infoModule.getCurrencies()
        return currencies.map(currency => ({
            name: currency,
            ticker: currency
        }))
    }

    async getInstrument(ticker: string): Promise<D_Instrument>{
        const { exchangeClient } = this
        const instrument = await exchangeClient.infoModule.getInstrument(ticker)
        if (!instrument) throw new Error(`Instrument with ticker "${ticker}" was not found`)
        if (!instrument.currency) throw new Error(`Instrument with ticker "${ticker}" have no currency`)
        return {
            currency_ticker: instrument.currency,
            name: instrument.name,
            price: await this.getInstrumentLastPrice(ticker),
            ticker: instrument.ticker
        }
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
        const { exchangeClient } = this
        const currency: C_Currency = await exchangeClient.infoModule.getInstrumentCurrency(ticker)
        return {
            name: currency,
            ticker: currency
        }
    }

    async getOperations(from: Date = new Date(0), to: Date = new Date()): Promise<D_Operation[]>{
        const { exchangeClient } = this
        const relevantOperations = await exchangeClient.infoModule.getOperationsAll(from, to)
        return await Promise.all(relevantOperations
            .filter(operation => operation.operationType === "Buy" || operation.operationType === "Sell")
            .map(
                async (operation): Promise<D_Operation> => {
                    const instrument: C_Instrument = await exchangeClient.infoModule.getInstrumentByExchangeId(operation?.figi || '')
                    return {
                        instrument_ticker: instrument.ticker,
                        amount: operation?.quantity || 0,
                        created_at: new Date(),
                        exchange_id: operation.id,
                        operation_type: operation.operationType === "Buy" ? 'buy' : 'sell',
                        price: operation?.price || 0,
                        status: operation.status,
                        updated_at: new Date(),
                        run_id: null
                    }
                }
            )
        )
    }

    async getOperationsByInstrument(ticker: string, from: Date = new Date(0), to: Date = new Date()): Promise<D_Operation[]>{
        const { exchangeClient } = this
        const relevantOperations = await exchangeClient.infoModule.getOperationsByInstrument(ticker, from, to)
        return await Promise.all(relevantOperations
            .filter(operation => operation.operationType === "Buy" || operation.operationType === "Sell")
            .map(
                async (operation): Promise<D_Operation> => {
                    const instrument: C_Instrument = await exchangeClient.infoModule.getInstrumentByExchangeId(operation?.figi || '')
                    return {
                        instrument_ticker: instrument.ticker,
                        amount: operation?.quantity || 0,
                        created_at: new Date(),
                        exchange_id: operation.id,
                        operation_type: operation.operationType === "Buy" ? 'buy' : 'sell',
                        price: operation?.price || 0,
                        status: operation.status,
                        run_id: null,
                        updated_at: new Date()
                    }
                }
            )
        )
    }
}
