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

export type AbstractExchangeConnectorConstructorParams<Domain extends DomainTemplate, TExchangeApi> = {
  modules: {
    tradeModule: AbstractTradeModule<Domain, TExchangeApi>
    infoModule: AbstractInfoModule<Domain, TExchangeApi>
    domainMapper: AbstractDomainMapper<Domain, TExchangeApi>
  }
  api: TExchangeApi
}

export abstract class AbstractExchangeConnector<Domain extends DomainTemplate = DomainTemplate, TExchangeApi = unknown>
  implements IExchangeConnector<Domain, TExchangeApi>
{
  private _isAccountInitialized = false
  public get isAccountInitialized(): boolean {
    return this._isAccountInitialized
  }
  protected set isAccountInitialized(value: boolean) {
    this._isAccountInitialized = value
  }

  readonly api: TExchangeApi
  readonly tradeModule: ITradeModule<Domain>
  readonly infoModule: IInfoModule<Domain>
  readonly domainMapper: IDomainMapper<Domain>

  constructor(options: AbstractExchangeConnectorConstructorParams<Domain, TExchangeApi>) {
    options.modules.tradeModule.setExchangeClient(this)
    options.modules.infoModule.setExchangeClient(this)
    options.modules.domainMapper.setExchangeClient(this)
    this.tradeModule = options.modules.tradeModule
    this.infoModule = options.modules.infoModule
    this.domainMapper = options.modules.domainMapper
    this.api = options.api
    this.initAccount()
  }

  protected abstract initAccount(): Promise<unknown>

  abstract getPortfolio(): Promise<GetSecurityBalanceType<Domain>[]>

  abstract getCurrenciesBalance(): Promise<GetCurrencyBalanceType<Domain>[]>
}
