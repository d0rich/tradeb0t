import { AbstractInfoModule } from './AbstractInfoModule'
import { AbstractTradeModule } from './AbstractTradeModule'
import {
  AbstractDomainMapper,
  GetCurrencyBalanceType,
  GetSecurityBalanceType,
  DomainTemplate,
  IDomainMapper
} from 'src/domain'
import { IExchangeConnector } from './IExchangeConnector'
import { IInfoModule } from './IInfoModule'
import { ITradeModule } from './ITradeModule'

export type AbstractExchangeConnectorConstructorParams<Domain extends DomainTemplate, TExchangeApi = undefined> = {
  modules: {
    tradeModule: AbstractTradeModule<Domain, TExchangeApi>
    infoModule: AbstractInfoModule<Domain, TExchangeApi>
    domainMapper: AbstractDomainMapper<Domain, TExchangeApi>
  }
  api?: TExchangeApi
}

export abstract class AbstractExchangeConnector<
  Domain extends DomainTemplate = DomainTemplate,
  TExchangeApi = undefined
> implements IExchangeConnector<Domain, TExchangeApi>
{
  readonly api: TExchangeApi
  readonly tradeModule: ITradeModule<Domain>
  readonly infoModule: IInfoModule<Domain>
  readonly domainMapper: IDomainMapper<Domain>

  abstract initAccount(): Promise<void> | void

  abstract getPortfolio(): Promise<GetSecurityBalanceType<Domain>[]>

  abstract getCurrenciesBalance(): Promise<GetCurrencyBalanceType<Domain>[]>

  public get isAccountInitialized(): boolean {
    return this._isAccountInitialized
  }
  protected set isAccountInitialized(value: boolean) {
    this._isAccountInitialized = value
  }
  private _isAccountInitialized = false

  constructor(options: AbstractExchangeConnectorConstructorParams<Domain, TExchangeApi>) {
    options.modules.tradeModule.setExchangeConnector(this)
    options.modules.infoModule.setExchangeConnector(this)
    options.modules.domainMapper.setExchangeConnector(this)
    this.tradeModule = options.modules.tradeModule
    this.infoModule = options.modules.infoModule
    this.domainMapper = options.modules.domainMapper
    if (options.api) {
      this.api = options.api
    }
  }
}
