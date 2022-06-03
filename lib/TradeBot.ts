import { config } from "../config";
import { ExchangeClient } from "../src/ExchangeClient";
import {BotApi, BotAuth, BotLogger, ExchangeAnalyzer, ExchangeTrader, ExchangeWatcher} from "./modules";

type TradeBotConstructorParams = {
    exchangeToken?: string,
    botToken?: string
  }

export class TradeBot {
    public readonly exchangeClient: ExchangeClient
    public readonly analyzer: ExchangeAnalyzer
    public readonly trader: ExchangeTrader
    public readonly watcher: ExchangeWatcher
    public readonly api: BotApi
    public readonly logger: BotLogger
    public readonly auth: BotAuth

    constructor({exchangeToken, botToken}: TradeBotConstructorParams = {}) {
        this.logger = new BotLogger(this)
        this.logger.log('TradeBot Initialization...')
        this.exchangeClient = new ExchangeClient(exchangeToken || config.exchange.exchangeToken)
        this.analyzer = new ExchangeAnalyzer(this)
        this.trader = new ExchangeTrader(this)
        this.watcher = new ExchangeWatcher(this)
        this.api = new BotApi(this)
        this.auth = new BotAuth(botToken || config.auth.token)
        this.logger.log('All modules are initialized...')
        this.analyzer.updateCurrencies()
    }

    public static createBotByEnv() {
        return new TradeBot({
            exchangeToken: process.env.TINKOFF_SANDBOX_API_KEY || '',
            botToken: process.env.BOT_TOKEN || ''
        })
    }
}
