import { ExchangeApi } from "../exchange";
import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./modules";

export class TradeBot {
    private readonly _analyzer: ExchangeAnalyzer
    private readonly _trader: ExchangeTrader
    private readonly _watcher: ExchangeWatcher
    private readonly _exchangeApi: ExchangeApi

    constructor(token: string) {
        this._analyzer = new ExchangeAnalyzer(this)
        this._trader = new ExchangeTrader(this)
        this._watcher = new ExchangeWatcher(this)
        this._exchangeApi = new ExchangeApi(token)
    }

    public get analyzer(): ExchangeAnalyzer { return this._analyzer }
    public get trader(): ExchangeTrader { return this._trader }
    public get watcher(): ExchangeWatcher { return this._watcher }
    public get exchangeApi(): ExchangeApi { return this._exchangeApi }
}
