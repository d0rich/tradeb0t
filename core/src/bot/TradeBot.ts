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

export interface TradeBotInitOptions<Domain extends DomainTemplate = StubDomain, TExchangeApi = unknown> {
  exchangeConnector: IExchangeConnector<Domain, TExchangeApi>
  config?: DeepPartial<ITradeBotConfig>
  initAlgorithmsCallback?: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[]
}
interface TradeBotSetupOptions<Domain extends DomainTemplate, TExchangeApi> {
  exchangeConnector: IExchangeConnector<Domain, TExchangeApi>
  initAlgorithmsCallback?: (analyzer: IExchangeAnalyzer<Domain, TExchangeApi>) => ITradeAlgorithm[]
}

export class TradeBot<Domain extends DomainTemplate, TExchangeApi> implements ITradeBot<Domain, TExchangeApi> {
  readonly config: ITradeBotConfig

  get exchangeConnector() {
    return this._exchangeConnector
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

  private _exchangeConnector: IExchangeConnector<Domain, TExchangeApi>
  private _analyzer: IExchangeAnalyzer<Domain, TExchangeApi>
  private _trader: IExchangeTrader
  private _watcher: IExchangeWatcher
  private _api: ApiService
  private _logger: LoggerService
  private _auth: AuthService

  constructor(options: TradeBotInitOptions<Domain, TExchangeApi>) {
    const { exchangeConnector, config, initAlgorithmsCallback } = options
    this.config = defu(config, defaultConfig)
    this.setup({ exchangeConnector, initAlgorithmsCallback })
  }

  private async setup({ exchangeConnector, initAlgorithmsCallback }: TradeBotSetupOptions<Domain, TExchangeApi>) {
    // Logger setup
    this._logger = new LoggerService(this)
    this.logger.start('TradeBot Initialization...')
    // ExchangeConnector setup
    this._exchangeConnector = this.logger.createErrorHandlingProxy(exchangeConnector)
    await this._exchangeConnector.initAccount()
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

    this.logger.success('All modules are initialized')
    await this.analyzer.initialize()
    await this.analyzer.updateCurrencies()
  }
}
