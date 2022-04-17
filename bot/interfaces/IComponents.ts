import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./IComponentRefs";
import {OperationTypes, OrderDetails, R_Portfolio} from "../../types";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";
export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{
    get tradeAlgos(): TradeAlgorithms;
}

export interface IExchangeWatcher extends ITraderRef, IAnalyzerRef{
    receiveOrderData(data: any)
    getRate(ticker: string)
    getPortfolio(): Promise<R_Portfolio>
}

export interface IExchangeTrader extends IWatcherRef{
    sendOrder({ ticker, lots, price }: OrderDetails, operation: OperationTypes)
    scheduleOrder(order: OrderDetails, date: Date)
    scheduleAction(action: Function, date: Date)
}
