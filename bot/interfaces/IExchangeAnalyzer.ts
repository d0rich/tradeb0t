import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import {D_PortfolioPosition, D_Currency, D_Security, D_FollowedSecurity, D_Operation} from "@prisma/client";
import { OperationType } from "types";

export interface IExchangeAnalyzer{
    get tradeAlgos(): TradeAlgorithms

    // Currencies
    updateCurrencies(): Promise<D_Currency[]>
    getCurrencies(): Promise<D_Currency[]>

    // Securities
    getSecurities(): Promise<D_Security[]>
    updateSecurities(): Promise<D_Security[]>
    addSecurities(...securities: D_Security[]): Promise<D_Security[]>

    // Followed Securities
    getFollowedSecurities(): Promise<D_FollowedSecurity[]>
    followSecurity(securityTicker: string): Promise<D_FollowedSecurity>
    unfollowSecurity(securityTicker: string): Promise<D_FollowedSecurity>
    updateFollowedSecurities(): Promise<D_Security[]>

    // Portfolio
    updatePortfolio(): Promise<D_PortfolioPosition[]>
    getPortfolio(): Promise<D_PortfolioPosition[]>
    clearPortfolio(): Promise<number>
    addPortfolioPosition(portfolioPosition: D_PortfolioPosition): Promise<D_PortfolioPosition>
    removePortfolioPosition(portfolioPosition: D_PortfolioPosition): Promise<D_PortfolioPosition | null>
    getPositionAverageBuyPrice(ticker: string): Promise<number>

    // Operations
    fixOperation(operation: D_Operation): Promise<D_Operation>
    updateOperationsAll(): Promise<D_Operation[]>
    updateOperationsBySecurity(ticker: string): Promise<D_Operation[]>
    getOperations(options: GetOperationsOptions): Promise<D_Operation[]>


}

export type OperationId = { 
    exchange_id: string 
} | { 
    security_ticker_created_at: {
        security_ticker: string
        created_at: Date
    }
}

export type GetOperationsOptions = {
    from?: Date,
    to?: Date,
    securityTicker?: string,
    operation?: OperationType
}