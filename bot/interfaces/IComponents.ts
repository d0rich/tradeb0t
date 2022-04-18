import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./IComponentRefs";
import {OperationTypes, OrderDetails} from "../../types";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
import { PortfolioPosition, Currency } from "@prisma/client";
export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{
    get tradeAlgos(): TradeAlgorithms
    updatePortfolio(): Promise<PortfolioPosition[]>
    updateCurrencies(): Promise<Currency[]>
    getCurrencies(): Promise<Currency[]>
    
}

export interface IExchangeWatcher extends ITraderRef, IAnalyzerRef{
    receiveOrderData(data: any)
    getRate(ticker: string)
    getPortfolio(): Promise<PortfolioPosition[]>
}

export interface IExchangeTrader extends IWatcherRef{
    sendOrder({ ticker, lots, price }: OrderDetails, operation: OperationTypes)
    scheduleOrder(order: OrderDetails, date: Date)
    scheduleAction(action: Function, date: Date)
}
