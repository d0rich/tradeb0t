import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./modules";

export class TradeBot {
    analyzer: ExchangeAnalyzer = new ExchangeAnalyzer(this);
    trader: ExchangeTrader = new ExchangeTrader(this);
    watcher: ExchangeWatcher = new ExchangeWatcher(this);

    constructor() {

    }
}
