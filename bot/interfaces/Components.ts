import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./ComponentRefs";
import {OrderOptions} from "../types";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";

export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{
    get tradeAlgos(): TradeAlgorithms;
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
