import { ExchangeClient } from "../exchange";
import {ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./modules";

export class TradeBot {
    private readonly _analyzer: ExchangeAnalyzer
    private readonly _trader: ExchangeTrader
    private readonly _watcher: ExchangeWatcher
    private readonly _exchangeClient: ExchangeClient

    constructor(token: string) {
        this._analyzer = new ExchangeAnalyzer(this)
        this._trader = new ExchangeTrader(this)
        this._watcher = new ExchangeWatcher(this)
        this._exchangeClient = new ExchangeClient(token)
    }

    public get analyzer(): ExchangeAnalyzer { return this._analyzer }
    public get trader(): ExchangeTrader { return this._trader }
    public get watcher(): ExchangeWatcher { return this._watcher }
    public get exchangeClient(): ExchangeClient { return this._exchangeClient }
}
