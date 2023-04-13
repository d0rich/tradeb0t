import { AbstractInfoModule } from './AbstractInfoModule'
import { AbstractTradeModule } from './AbstractTradeModule'
import { AbstractDomainMapper } from './AbstractDomainMapper'
import { DomainTemplate } from '../domain'
import { GetCurrencyBalanceType, GetSecurityBalanceType } from '../domain/extractors'
import { IExchangeClient } from './IExchangeClient'
import { ITradeModule } from './ITradeModule'
import { IInfoModule } from './IInfoModule'
import { IDomainMapper } from './IDomainMapper'

export type AbstractExchangeClientConstructorParams<Domain extends DomainTemplate, TExchangeApi> = {
  modules: {
    tradeModule: AbstractTradeModule<Domain, TExchangeApi>
    infoModule: AbstractInfoModule<Domain, TExchangeApi>
    domainMapper: AbstractDomainMapper<Domain, TExchangeApi>
  }
  api: TExchangeApi
}

export abstract class AbstractExchangeClient<Domain extends DomainTemplate = DomainTemplate, TExchangeApi = unknown>
  implements IExchangeClient<Domain, TExchangeApi>
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

  protected constructor(options: AbstractExchangeClientConstructorParams<Domain, TExchangeApi>) {
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
