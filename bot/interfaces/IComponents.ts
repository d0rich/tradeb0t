import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./IComponentRefs";
import {OrderDetails, OrderOptions} from "../../types";
import {TradeAlgorithms} from "../../config/TradeAlgorithms";

export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{
    get tradeAlgos(): TradeAlgorithms;
}

export interface IExchangeWatcher extends ITraderRef, IAnalyzerRef{
    receiveOrderData(data: any)
    getRate(ticker: string)
}

export interface IExchangeTrader extends IWatcherRef{
    sell({ ticker, lots, price }: OrderDetails)
    buy({ ticker, lots, price }: OrderDetails)
    sellOrCancel()
    buyOrCancel()
    scheduleOrder(order: OrderOptions, date: Date)
    scheduleAction(action: Function, date: Date)
}
