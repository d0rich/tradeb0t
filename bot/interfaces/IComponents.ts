import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./IComponentRefs";
import {OperationType, OrderDetails} from "../../types";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import {D_PortfolioPosition, D_Currency, D_Security, D_FollowedSecurity, D_Operation} from "@prisma/client";
import {Job} from "node-schedule";
import { Operation } from "@tinkoff/invest-openapi-js-sdk";
export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{
    get tradeAlgos(): TradeAlgorithms

    // Currencies
    updateCurrencies(): Promise<D_Currency[]>
    getCurrencies(): Promise<D_Currency[]>

    // Securities
    getSecurities(): Promise<D_Security[]>
    updateSecurities(): Promise<D_Security[]>
    addSecurities(...securities: D_Security[]): Promise<D_Security[]>

    // Followed Securities
    getFollowedSecurities(): D_FollowedSecurity[]
    followSecurity(): D_FollowedSecurity
    unfollowSecurity(): Promise<null>
    updateFollowedSecurities(): D_Security[]

    // Portfolio
    updatePortfolio(): Promise<D_PortfolioPosition[]>
    getPortfolio(): Promise<D_PortfolioPosition[]>
    clearPortfolio(): Promise<null>
    addPortfolioPosition(): Promise<D_PortfolioPosition>
    removePortfolioPosition(): Promise<D_PortfolioPosition | null>
    getPositionAverageBuyPrice(ticker: string): Promise<number>

    // Operations
    addOperation(): Promise<D_Operation>
    updateOperation(): Promise<D_Operation>
    updateOperationsAll(): Promise<D_Operation[]>
    updateOperationsBySecurity(): Promise<D_Operation[]>
    getOperations(): Promise<D_Operation[]>


}

export interface IExchangeWatcher extends ITraderRef, IAnalyzerRef{
    receiveOrderData(data: any): any
    getRate(ticker: string): any
    getPortfolio(): Promise<D_PortfolioPosition[]>
}

export interface IExchangeTrader extends IWatcherRef{
    sendOrder({ ticker, lots, price }: OrderDetails, operation: OperationType): any
    scheduleOrder(order: OrderDetails, date: Date): Job
    scheduleAction(action: Function, date: Date): Job
}
