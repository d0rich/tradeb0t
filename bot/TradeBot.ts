import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./modules";

export class TradeBot {
    private readonly _analyzer: ExchangeAnalyzer
    private readonly _trader: ExchangeTrader
    private readonly _watcher: ExchangeWatcher

    constructor() {
        this._analyzer = new ExchangeAnalyzer(this)
        this._trader = new ExchangeTrader(this)
        this._watcher = new ExchangeWatcher(this)
    }

    public get analyzer(): ExchangeAnalyzer { return this._analyzer }
    public get trader(): ExchangeTrader { return this._trader }
    public get watcher(): ExchangeWatcher { return this._watcher }
}
