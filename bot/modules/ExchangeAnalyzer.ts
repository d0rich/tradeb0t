import {GetOperationsOptions, IExchangeAnalyzer, OperationId} from "../interfaces";
import {ExchangeTrader, ExchangeWatcher} from ".";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import {TradeBot} from "../TradeBot";
import { D_Currency, D_PortfolioPosition, PrismaClient, D_Security, D_FollowedSecurity, D_Operation, D_Algorithm, D_AlgorithmRun } from "@prisma/client";

const db = new PrismaClient()

export class ExchangeAnalyzer implements IExchangeAnalyzer{
    readonly tradebot: TradeBot
    get trader(): ExchangeTrader { return this.tradebot.trader }
    get watcher(): ExchangeWatcher { return this.tradebot.watcher }
    private getOperationId(operation: D_Operation): OperationId{
        if (!!operation.exchange_id) return { exchange_id: operation.exchange_id }
        return { 
            security_ticker_created_at: {
                security_ticker: operation.security_ticker, 
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
        return await db.d_Currency.findMany({})
    }

    // Securities

    async updateSecurities(): Promise<D_Security[]> {
        const { watcher } = this
        const securities: D_Security[] = await db.d_Security.findMany({  })
        const securitiesPrices = await Promise.all(
            securities.map((security): Promise<number> => watcher.getSecurityLastPrice(security.ticker))
        )
        const updatePromises = securities
            .map((security, index) => db.d_Security.update({ 
                    where: { ticker: security.ticker },
                    data: { price: securitiesPrices[index] }
                })
            )
        return await Promise.all(updatePromises) 
    }

    async getSecurities(): Promise<D_Security[]> {
        return await db.d_Security.findMany({})
    }

    async addSecurities(...securities: D_Security[]): Promise<D_Security[]> {
        const { watcher } = this
        const securitiesToAdd: D_Security[] = await Promise.all(
            securities.map(async (security): Promise<D_Security> => {
                const currency: D_Currency = await watcher.getSecurityCurrency(security.ticker)
                return {
                    ticker: security.ticker,
                    name: await watcher.getSecurityName(security.ticker),
                    price: await watcher.getSecurityLastPrice(security.ticker),
                    currency_ticker: currency.ticker
                } 
            })
        )
        const createOrUpdatePromises = securitiesToAdd
            .map((security) => db.d_Security.upsert({ 
                    where: { ticker: security.ticker },
                    update: { price: security.price },
                    create: security
                })
            )
        return await Promise.all(createOrUpdatePromises) 
    }

    // Followed Securities

    async getFollowedSecurities(): Promise<D_FollowedSecurity[]> {
        return await db.d_FollowedSecurity.findMany({})
    }
    async followSecurity(securityTicker: string): Promise<D_FollowedSecurity> {
        return await db.d_FollowedSecurity.create({ 
            data: {
                security_ticker: securityTicker,
                followed_since: new Date()
            }
        })
    }
    async unfollowSecurity(securityTicker: string): Promise<D_FollowedSecurity> {
        return await db.d_FollowedSecurity.delete({
            where: { security_ticker: securityTicker }
        })
    }
    async updateFollowedSecurities(): Promise<D_Security[]> {
        const { watcher } = this
        const securitiesToUpdate = await db.d_FollowedSecurity.findMany({})
        const securitiesPrices = await Promise.all(
            securitiesToUpdate.map(security => watcher.getSecurityLastPrice(security.security_ticker))
        )
        const updatePromises = securitiesToUpdate.map((security, index) => db.d_Security.update({ 
            where: { ticker: security.security_ticker },
            data: { price: securitiesPrices[index] } 
        }))
        return await Promise.all(updatePromises)
    }

    // Portfolio

    async updatePortfolio(): Promise<D_PortfolioPosition[]>{
        const { watcher } = this
        const relevantPortfolio = await watcher.getPortfolio()
        return await Promise.all(relevantPortfolio.map(position => db.d_PortfolioPosition.upsert(
            { 
                where: { security_ticker: position.security_ticker },
                update: { amount: position.amount },
                create: position
            })
        ))
        
    }

    async getPortfolio(): Promise<D_PortfolioPosition[]> {
        return await db.d_PortfolioPosition.findMany({})
    }

    async clearPortfolio(): Promise<number> {
        const { count: deleted } = await db.d_PortfolioPosition.deleteMany({})
        return deleted
    }
    async addPortfolioPosition(portfolioPosition: D_PortfolioPosition): Promise<D_PortfolioPosition> {
        return await db.$transaction(async (db) => {
            const positionToUpdate = await db.d_PortfolioPosition.findUnique({ 
                where: { security_ticker: portfolioPosition.security_ticker } 
            })
            return db.d_PortfolioPosition.upsert({
                where: { security_ticker: portfolioPosition.security_ticker },
                update: { amount: (positionToUpdate?.amount || 0) + portfolioPosition.amount },
                create: portfolioPosition
            })
        })
    }
    async removePortfolioPosition(portfolioPosition: D_PortfolioPosition): Promise<D_PortfolioPosition | null> {
        return await db.$transaction(async (db) => {
            const positionToUpdate = await db.d_PortfolioPosition.findUnique({ 
                where: { security_ticker: portfolioPosition.security_ticker } 
            })
            if ((positionToUpdate?.amount || 0) - portfolioPosition.amount > 0)
                return db.d_PortfolioPosition.update({
                    where: { security_ticker: portfolioPosition.security_ticker },
                    data: { amount: (positionToUpdate?.amount || 0) + portfolioPosition.amount }
                })
            return db.d_PortfolioPosition.delete({ where: { security_ticker: portfolioPosition.security_ticker } })
        })
    }
    async getPositionAverageBuyPrice(ticker: string): Promise<number> {
        const position = await db.d_PortfolioPosition.findUnique({where: { security_ticker: ticker }})
        async function getBoughtStats(take: number){
            const boughtStats = await db.d_Operation.aggregate({
                orderBy: { created_at: 'desc' },
                where: {
                    operation_type: 'buy',
                    security_ticker: ticker
                },
                take,
                _sum: { amount: true },
                _count: { _all: true }
            })
            return boughtStats
        }
        let countOperations = 5
        for ( let boughtStats = await getBoughtStats(countOperations); 
            (!!boughtStats._sum.amount ? boughtStats._sum.amount < (position?.amount || 0) : 0) || boughtStats._count._all !== 0 ; 
            countOperations++ ){}
        const lastSecurityBuyOperations: D_Operation[] = await db.d_Operation.findMany({
            orderBy: { created_at: 'desc' },
                where: {
                    operation_type: 'buy',
                    security_ticker: ticker
                },
                take: countOperations
        })
        let buyPrice = 0
        let boughtAmount = position?.amount || 0
        for ( let buyOperation of lastSecurityBuyOperations ){
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
        const { getOperationId } = this
        const operationId: OperationId = getOperationId(operation)
        return await db.d_Operation.upsert({
            where: operationId,
            update: { amount: operation.amount, updated_at: new Date() },
            create: {
                ...operation,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
    }

    async updateOperationsAll(): Promise<D_Operation[]> {
        const { watcher, fixOperation } = this
        const allOperations = await watcher.getOperations()
        return await Promise.all(allOperations.map(operation => fixOperation(operation)))
    }
    async updateOperationsBySecurity(ticker: string): Promise<D_Operation[]> {
        const { watcher, fixOperation } = this
        const allOperations = await watcher.getOperationsBySecurity(ticker)
        return await Promise.all(allOperations.map(operation => fixOperation(operation)))
    }
    async getOperations({ from, to, operation, securityTicker }: GetOperationsOptions): Promise<D_Operation[]> {
        return await db.d_Operation.findMany({
            orderBy: { created_at: 'desc' },
            where: {
                AND: [
                    { created_at: { gte: from || new Date(0) } },
                    { created_at: { lte: to || new Date() } }
                ],
                operation_type: operation,
                security_ticker: securityTicker
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
        return await db.d_AlgorithmRun.create({
            data: {
                algorithm_name: algorithmName,
                inputs: JSON.stringify(inputs),
                state: JSON.stringify(state)
            }
        })
    }

    async saveAlgorithmRunProgress(id: number, state: any): Promise<D_AlgorithmRun>{
        return await db.d_AlgorithmRun.update({
            where: { id },
            data: {
                state: JSON.stringify(state)
            }
        })
    }

    async loadAlgorithmRunProgress(id: number): Promise<D_AlgorithmRun | null>{
        return await db.d_AlgorithmRun.findUnique({ where: { id } })
    }

    async finishAlgorithmRun(id: number): Promise<D_AlgorithmRun>{
        return await db.d_AlgorithmRun.update({
            where: { id },
            data: {
                state: JSON.stringify({ status: 'finished' })
            }
        })
    }

    async getUnfinishedAlgorithmRuns(): Promise<D_AlgorithmRun[]>{
        return await db.d_AlgorithmRun.findMany({
            where: { NOT: { state: JSON.stringify({ status: 'finished' }) } }
        })
    }
}
