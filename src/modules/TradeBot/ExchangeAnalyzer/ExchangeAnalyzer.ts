import {GetOperationsOptions, OperationId} from "src/utils";
import {ExchangeTrader, ExchangeWatcher} from "../index";
import {TradeAlgorithms} from "./TradeAlgorithms";
import {TradeBot} from "src/TradeBot";
import { D_Currency, D_PortfolioPosition, PrismaClient, D_Instrument, D_FollowedInstrument, D_Operation, D_Algorithm, D_AlgorithmRun } from "@prisma/client";

const db = new PrismaClient()

export class ExchangeAnalyzer {
    readonly tradebot: TradeBot
    get trader(): ExchangeTrader { return this.tradebot.trader }
    get watcher(): ExchangeWatcher { return this.tradebot.watcher }
    private static getOperationId(operation: D_Operation): OperationId{
        if (!!operation.exchange_id) return { exchange_id: operation.exchange_id }
        return {
            instrument_ticker_created_at: {
                instrument_ticker: operation.instrument_ticker,
                created_at: operation.created_at
            }
        }
    }
    readonly tradeAlgos: TradeAlgorithms

    constructor(tradebot: TradeBot) {
        this.tradebot = tradebot
        this.tradeAlgos = new TradeAlgorithms(this)
        this.saveAlgorithms()
    }

    // Currencies

    async updateCurrencies(): Promise<D_Currency[]> {
        const { watcher } = this
        const relevantCurrencies = await watcher.getCurrencies()
        return await Promise.all(relevantCurrencies
            .map(currency => db.d_Currency.upsert({
                where: { ticker: currency.ticker },
                update: {},
                create: currency
            }))
        )
    }

    async getCurrencies(): Promise<D_Currency[]> {
        return db.d_Currency.findMany({})
    }

    // Instruments

    async updateInstruments(): Promise<D_Instrument[]> {
        const { watcher } = this
        const instruments: D_Instrument[] = await db.d_Instrument.findMany({  })
        const instrumentsPrices = await Promise.all(
            instruments.map((instrument): Promise<number> => watcher.getInstrumentLastPrice(instrument.ticker))
        )
        const updatePromises = instruments
            .map((instrument, index) => db.d_Instrument.update({
                    where: { ticker: instrument.ticker },
                    data: { price: instrumentsPrices[index] }
                })
            )
        return await Promise.all(updatePromises)
    }

    async getInstruments(): Promise<D_Instrument[]> {
        return db.d_Instrument.findMany({})
    }

    async addInstruments(...instruments: D_Instrument[]): Promise<D_Instrument[]> {
        const { watcher } = this
        const instrumentsToAdd: D_Instrument[] = await Promise.all(
            instruments.map((instrument): Promise<D_Instrument> => watcher.getInstrument(instrument.ticker))
        )
        const createOrUpdatePromises = instrumentsToAdd
            .map((instrument) => db.d_Instrument.upsert({
                    where: { ticker: instrument.ticker },
                    update: { price: instrument.price },
                    create: instrument
                })
            )
        return await Promise.all(createOrUpdatePromises)
    }

    // Followed Instruments

    async getFollowedInstruments(): Promise<D_FollowedInstrument[]> {
        return db.d_FollowedInstrument.findMany({})
    }
    async followInstrument(instrumentTicker: string): Promise<D_FollowedInstrument> {
        return db.d_FollowedInstrument.create({
            data: {
                instrument_ticker: instrumentTicker,
                followed_since: new Date()
            }
        })
    }
    async unfollowInstrument(instrumentTicker: string): Promise<D_FollowedInstrument> {
        return db.d_FollowedInstrument.delete({
            where: { instrument_ticker: instrumentTicker }
        })
    }
    async updateFollowedInstruments(): Promise<D_Instrument[]> {
        const { watcher } = this
        const instrumentsToUpdate = await db.d_FollowedInstrument.findMany({})
        const instrumentsPrices = await Promise.all(
            instrumentsToUpdate.map(instrument => watcher.getInstrumentLastPrice(instrument.instrument_ticker))
        )
        const updatePromises = instrumentsToUpdate.map((instrument, index) => db.d_Instrument.update({
            where: { ticker: instrument.instrument_ticker },
            data: { price: instrumentsPrices[index] }
        }))
        return await Promise.all(updatePromises)
    }

    // Portfolio

    async updatePortfolio(): Promise<D_PortfolioPosition[]>{
        const { watcher } = this
        const relevantPortfolio = await watcher.getPortfolio()
        const instruments = await Promise.all(relevantPortfolio.map(p => watcher.getInstrument(p.instrument_ticker)))
        await this.addInstruments(...instruments)
        return await Promise.all(relevantPortfolio.map(position => db.d_PortfolioPosition.upsert(
            {
                where: { instrument_ticker: position.instrument_ticker },
                update: { amount: position.amount },
                create: position
            })
        ))

    }

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        return db.d_PortfolioPosition.findMany({})
    }

    async clearPortfolio(): Promise<number> {
        const { count: deleted } = await db.d_PortfolioPosition.deleteMany({})
        return deleted
    }
    async addPortfolioPosition(portfolioPosition: D_PortfolioPosition): Promise<D_PortfolioPosition> {
        return await db.$transaction(async (db) => {
            const positionToUpdate = await db.d_PortfolioPosition.findUnique({
                where: { instrument_ticker: portfolioPosition.instrument_ticker }
            })
            return db.d_PortfolioPosition.upsert({
                where: { instrument_ticker: portfolioPosition.instrument_ticker },
                update: { amount: (positionToUpdate?.amount || 0) + portfolioPosition.amount },
                create: portfolioPosition
            })
        })
    }
    async removePortfolioPosition(portfolioPosition: D_PortfolioPosition): Promise<D_PortfolioPosition | null> {
        return await db.$transaction(async (db) => {
            const positionToUpdate = await db.d_PortfolioPosition.findUnique({
                where: { instrument_ticker: portfolioPosition.instrument_ticker }
            })
            if ((positionToUpdate?.amount || 0) - portfolioPosition.amount > 0)
                return db.d_PortfolioPosition.update({
                    where: { instrument_ticker: portfolioPosition.instrument_ticker },
                    data: { amount: (positionToUpdate?.amount || 0) + portfolioPosition.amount }
                })
            return db.d_PortfolioPosition.delete({ where: { instrument_ticker: portfolioPosition.instrument_ticker } })
        })
    }
    async getPositionAverageBuyPrice(ticker: string): Promise<number> {
        const position = await db.d_PortfolioPosition.findUnique({where: { instrument_ticker: ticker }})
        async function getBoughtStats(take: number){
            const boughtStats = await db.d_Operation.aggregate({
                orderBy: { created_at: 'desc' },
                where: {
                    operation_type: 'buy',
                    instrument_ticker: ticker
                },
                take,
                _sum: { amount: true },
                _count: { _all: true }
            })
            return boughtStats
        }
        let countOperations = 5
        let boughtStats = await getBoughtStats(countOperations)
        while ((!!boughtStats._sum.amount ? boughtStats._sum.amount < (position?.amount || 0) : false) && boughtStats._count._all !== 0) {
            countOperations++
            boughtStats = await getBoughtStats(countOperations)
        }
        // for ( let boughtStats = await getBoughtStats(countOperations);
        //     (!!boughtStats._sum.amount ? boughtStats._sum.amount < (position?.amount || 0) : false) && boughtStats._count._all !== 0 ;
        //     countOperations++ ){
        //     console.log(boughtStats)
        //     console.log(countOperations)
        // }
        const lastInstrumentBuyOperations: D_Operation[] = await db.d_Operation.findMany({
            orderBy: { created_at: 'desc' },
                where: {
                    operation_type: 'buy',
                    instrument_ticker: ticker
                },
                take: countOperations
        })
        let buyPrice = 0
        let boughtAmount = position?.amount || 0
        for ( let buyOperation of lastInstrumentBuyOperations ){
            if (buyOperation.amount >= boughtAmount){
                buyPrice += boughtAmount * buyOperation.price
                break
            }
            buyPrice += buyOperation.amount * buyOperation.price
            boughtAmount -= buyOperation.amount
        }
        return buyPrice / (position?.amount || 1)
    }

    // Operations

    async fixOperation(operation: D_Operation): Promise<D_Operation> {
        const { getOperationId } = ExchangeAnalyzer
        const operationId: OperationId = getOperationId(operation)
        return db.d_Operation.upsert({
            where: operationId,
            update: { amount: operation.amount, updated_at: new Date() },
            create: {
                ...operation,
                updated_at: new Date()
            }
        })
    }

    async updateOperationsAll(): Promise<D_Operation[]> {
        const { watcher, fixOperation } = this
        const allOperations = await watcher.getOperations()
        return await Promise.all(allOperations.map(operation => fixOperation(operation)))
    }
    async updateOperationsByInstrument(ticker: string): Promise<D_Operation[]> {
        const { watcher, fixOperation } = this
        const allOperations = await watcher.getOperationsByInstrument(ticker)
        return await Promise.all(allOperations.map(operation => fixOperation(operation)))
    }
    async getOperations({ from, to, operation, instrumentTicker }: GetOperationsOptions): Promise<D_Operation[]> {
        return db.d_Operation.findMany({
            orderBy: { created_at: 'desc' },
            where: {
                AND: [
                    { created_at: { gte: from || new Date(0) } },
                    { created_at: { lte: to || new Date() } }
                ],
                operation_type: operation,
                instrument_ticker: instrumentTicker
            }
        })
    }

    // Algorithms

    async saveAlgorithms(): Promise<D_Algorithm[]>{
        const { tradeAlgos } = this
        const updatePromises = tradeAlgos.description.map(algo => db.d_Algorithm.upsert({
            where: { name: algo.name },
            update: {
                description: algo.description,
                input_types: algo.input_types
            },
            create: algo
        }))
        return await Promise.all(updatePromises)
    }

    async runAlgorithm(algorithmName: string, inputs: any, state: any = inputs): Promise<D_AlgorithmRun>{
        return db.d_AlgorithmRun.create({
            data: {
                algorithm_name: algorithmName,
                inputs: JSON.stringify(inputs),
                state: JSON.stringify(state)
            }
        })
    }

    async saveAlgorithmRunProgress(id: number, state: any): Promise<D_AlgorithmRun>{
        return db.d_AlgorithmRun.update({
            where: { id },
            data: {
                state: JSON.stringify(state)
            }
        })
    }

    async loadAlgorithmRunProgress(id: number): Promise<D_AlgorithmRun | null>{
        return db.d_AlgorithmRun.findUnique({ where: { id } })
    }

    async finishAlgorithmRun(id: number): Promise<D_AlgorithmRun>{
        return db.d_AlgorithmRun.update({
            where: { id },
            data: {
                state: JSON.stringify({ status: 'finished' })
            }
        })
    }

    async getUnfinishedAlgorithmRuns(): Promise<D_AlgorithmRun[]>{
        return db.d_AlgorithmRun.findMany({
            where: { NOT: { state: JSON.stringify({ status: 'finished' }) } }
        })
    }
}
