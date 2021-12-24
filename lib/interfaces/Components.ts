import {IAnalyzerRef, IWatcherRef, ITraderRef} from "./ComponentRefs";

export interface IExchangeAnalyzer extends IWatcherRef, ITraderRef{

}

export interface IExchangeWatcher extends ITraderRef, IAnalyzerRef{

}

export interface IExchangeTrader extends IAnalyzerRef, IWatcherRef{

}
