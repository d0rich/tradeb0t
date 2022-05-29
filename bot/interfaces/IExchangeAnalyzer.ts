import {TradeAlgorithms} from "config/TradeAlgorithms";
import {D_PortfolioPosition, D_Currency, D_Instrument, D_FollowedInstrument, D_Operation} from "@prisma/client";
import { OperationType } from "types";

export interface IExchangeAnalyzer{
    get tradeAlgos(): TradeAlgorithms

    // Currencies
    updateCurrencies(): Promise<D_Currency[]>
    getCurrencies(): Promise<D_Currency[]>

    // Instruments
    getInstruments(): Promise<D_Instrument[]>
    updateInstruments(): Promise<D_Instrument[]>
    addInstruments(...securities: D_Instrument[]): Promise<D_Instrument[]>

    // Followed Instruments
    getFollowedInstruments(): Promise<D_FollowedInstrument[]>
    followInstrument(securityTicker: string): Promise<D_FollowedInstrument>
    unfollowInstrument(securityTicker: string): Promise<D_FollowedInstrument>
    updateFollowedInstruments(): Promise<D_Instrument[]>

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
    updateOperationsByInstrument(ticker: string): Promise<D_Operation[]>
    getOperations(options: GetOperationsOptions): Promise<D_Operation[]>


}

export type OperationId = { 
    exchange_id: string 
} | { 
    instrument_ticker_created_at: {
        instrument_ticker: string
        created_at: Date
    }
}

export type GetOperationsOptions = {
    from?: Date,
    to?: Date,
    instrumentTicker?: string,
    operation?: OperationType
}