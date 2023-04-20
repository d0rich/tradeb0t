import {
  IExchangeTrader,
  IExchangeWatcher,
  IExchangeAnalyzer,
  ExchangeAnalyzer,
  ExchangeTrader,
  ExchangeWatcher
} from './modules'
import { ApiService, AuthService, LoggerService } from './services'
import { IExchangeConnector } from 'src/connector'
import { ITradeAlgorithm } from 'src/algorithms'
import { DomainTemplate, StubDomain } from '../domain'
import { ITradeBot } from './ITradeBot'

interface TradeBotProductionInitOptions<Domain extends DomainTemplate, TExchangeApi> {
  mode: 'production'
  exchangeClient: IExchangeConnector<Domain, TExchangeApi>
  botToken?: string
  initAlgorithmsCallback?: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[]
}

interface TradeBotNoSetupInitOptions {
  /**
   * Option for creation of `TradeBot` instance without running processes under hood.
   * Used to extract types for api client.
   */
  mode: 'no_setup'
}

export type TradeBotInitOptions<Domain extends DomainTemplate = StubDomain, TExchangeApi = unknown> =
  | TradeBotProductionInitOptions<Domain, TExchangeApi>
  | TradeBotNoSetupInitOptions

interface TradeBotSetupOptions<Domain extends DomainTemplate, TExchangeApi> {
  exchangeClient: IExchangeConnector<Domain, TExchangeApi>
  botToken?: string
  initAlgorithmsCallback?: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[]
}

export class TradeBot<Domain extends DomainTemplate, TExchangeApi> implements ITradeBot<Domain, TExchangeApi> {
  private _exchangeClient: IExchangeConnector<Domain, TExchangeApi>
  private _analyzer: IExchangeAnalyzer<Domain, TExchangeApi>
  private _trader: IExchangeTrader
  private _watcher: IExchangeWatcher<Domain>
  private _api: ApiService
  private _logger: LoggerService
  private _auth: AuthService

  get exchangeClient() {
    return this._exchangeClient
  }
  get analyzer() {
    return this._analyzer
  }
  get trader() {
    return this._trader
  }
  get watcher() {
    return this._watcher
  }
  get api() {
    return this._api
  }
  get logger() {
    return this._logger
  }
  get auth() {
    return this._auth
  }

  constructor(options: TradeBotInitOptions<Domain, TExchangeApi>) {
    if (options.mode === 'production') {
      const { exchangeClient, botToken, initAlgorithmsCallback } = options
      this.setup({ exchangeClient, botToken, initAlgorithmsCallback })
    }
  }

  private async setup({
    exchangeClient,
    botToken,
    initAlgorithmsCallback
  }: TradeBotSetupOptions<Domain, TExchangeApi>) {
    this._logger = new LoggerService(this)
    this.logger.log({
      type: 'info',
      message: 'TradeBot Initialization...'
    })
    this._exchangeClient = this.logger.createErrorHandlingProxy(exchangeClient)
    await this._exchangeClient.initAccount()
    this._analyzer = this.logger.createErrorHandlingProxy(new ExchangeAnalyzer(this, initAlgorithmsCallback))
    this._trader = this.logger.createErrorHandlingProxy(new ExchangeTrader(this))
    this._watcher = this.logger.createErrorHandlingProxy(new ExchangeWatcher(this))
    this._api = this.logger.createErrorHandlingProxy(new ApiService(this))
    this._auth = this.logger.createErrorHandlingProxy(new AuthService(botToken))
    this.logger.log({
      type: 'info',
      message: 'All modules are initialized'
    })
    await this.analyzer.start()
    await this.analyzer.updateCurrencies()
  }
}
