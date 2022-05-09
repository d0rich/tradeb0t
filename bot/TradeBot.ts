import { config } from "../config";
import { ExchangeClient } from "../exchange";
import {BotApi, BotAuth, BotLogger, ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./modules";

type TradeBotConstructorParams = { 
    exchangeToken?: string, 
    botToken?: string 
  }
  
export class TradeBot {
    private readonly _analyzer: ExchangeAnalyzer
    private readonly _trader: ExchangeTrader
    private readonly _watcher: ExchangeWatcher
    private readonly _exchangeClient: ExchangeClient
    private readonly _api: BotApi
    private readonly _logger: BotLogger
    private readonly _auth: BotAuth

    constructor({exchangeToken, botToken}: TradeBotConstructorParams = {}) {
        this._analyzer = new ExchangeAnalyzer(this)
        this._trader = new ExchangeTrader(this)
        this._watcher = new ExchangeWatcher(this)
        this._api = new BotApi(this)
        this._logger = new BotLogger(this)
        this._exchangeClient = new ExchangeClient(exchangeToken || config.exchange.exchangeToken)
        this._auth = new BotAuth(botToken || config.auth.token)
    }

    public static createBotByEnv() {
        return new TradeBot({ 
            exchangeToken: process.env.TINKOFF_SANDBOX_API_KEY || '',
            botToken: process.env.BOT_TOKEN || ''
        })
    }

    public get analyzer(): ExchangeAnalyzer { return this._analyzer }
    public get trader(): ExchangeTrader { return this._trader }
    public get watcher(): ExchangeWatcher { return this._watcher }
    public get exchangeClient(): ExchangeClient { return this._exchangeClient }
    public get logger(): BotLogger { return this._logger }
    public get auth(): BotAuth { return this._auth }
    public get api(): BotApi { return this._api }
}
