import { defu } from 'defu'
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
import { ITradeBotConfig, defaultConfig } from './ITradeBotConfig'
import type { DeepPartial } from 'typeorm'

interface TradeBotProductionInitOptions<Domain extends DomainTemplate, TExchangeApi> {
  mode: 'production'
  exchangeClient: IExchangeConnector<Domain, TExchangeApi>
  config?: DeepPartial<ITradeBotConfig>
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
  initAlgorithmsCallback?: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[]
}

export class TradeBot<Domain extends DomainTemplate, TExchangeApi> implements ITradeBot<Domain, TExchangeApi> {
  readonly config: ITradeBotConfig

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

  private _exchangeClient: IExchangeConnector<Domain, TExchangeApi>
  private _analyzer: IExchangeAnalyzer<Domain, TExchangeApi>
  private _trader: IExchangeTrader
  private _watcher: IExchangeWatcher<Domain>
  private _api: ApiService
  private _logger: LoggerService
  private _auth: AuthService

  constructor(options: TradeBotInitOptions<Domain, TExchangeApi>) {
    if (options.mode === 'production') {
      const { exchangeClient, config, initAlgorithmsCallback } = options
      this.config = defu(config, defaultConfig)
      this.setup({ exchangeClient, initAlgorithmsCallback })
    }
  }

  private async setup({
    exchangeClient,
    initAlgorithmsCallback
  }: TradeBotSetupOptions<Domain, TExchangeApi>) {
    // Logger setup
    this._logger = new LoggerService(this)
    this.logger.log({
      type: 'info',
      message: 'TradeBot Initialization...'
    })
    // ExchangeConnector setup
    this._exchangeClient = this.logger.createErrorHandlingProxy(exchangeClient)
    await this._exchangeClient.initAccount()
    // Analyzer setup
    const analyzer = new ExchangeAnalyzer(this, initAlgorithmsCallback)
    this._analyzer = this.logger.createErrorHandlingProxy(analyzer)
    // Trader setup
    const trader = new ExchangeTrader(this)
    this._trader = this.logger.createErrorHandlingProxy(trader)
    // Watcher setup
    const watcher = new ExchangeWatcher(this)
    this._watcher = this.logger.createErrorHandlingProxy(watcher)
    // Api setup
    const apiService = new ApiService(this)
    this._api = this.logger.createErrorHandlingProxy(apiService)
    // Auth setup
    const authService = new AuthService(this)
    this._auth = this.logger.createErrorHandlingProxy(authService)

    this.logger.log({
      type: 'info',
      message: 'All modules are initialized'
    })
    await this.analyzer.start()
    await this.analyzer.updateCurrencies()
  }
}
