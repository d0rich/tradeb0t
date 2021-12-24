import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./ComponentRefs";
import {OrderOptions} from "../types";

export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{
}

export interface IExchangeWatcher extends ITraderRef, IAnalyzerRef{
    receiveOrderData(data: any)
    getRate(ticker: string)
}

export interface IExchangeTrader extends IWatcherRef{
    sendOrder({operation, ticker, lots, price}: OrderOptions)
    scheduleOrder(order: OrderOptions, date: Date)
    scheduleAction(action: Function, date: Date)
}
