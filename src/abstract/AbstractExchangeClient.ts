import { AbstractInfoModule } from './AbstractInfoModule'
import { AbstractTradeModule } from './AbstractTradeModule'
import { AbstractDomainMapper } from './AbstractDomainMapper'
import { DomainTemplate } from '../domain'
import { GetCurrencyBalanceType, GetSecurityBalanceType } from '../domain/extractors'

export abstract class AbstractExchangeClient<
  Domain extends DomainTemplate = DomainTemplate,
  ExchangeApiType = unknown
> {
  private _isAccountInitialized = false
  public get isAccountInitialized(): boolean {
    return this._isAccountInitialized
  }
  protected set isAccountInitialized(value: boolean) {
    this._isAccountInitialized = value
  }

  readonly api: ExchangeApiType
  readonly tradeModule: AbstractTradeModule<AbstractExchangeClient<Domain, ExchangeApiType>>
  readonly infoModule: AbstractInfoModule<AbstractExchangeClient<Domain, ExchangeApiType>>
  readonly translator: AbstractDomainMapper<AbstractExchangeClient<Domain, ExchangeApiType>>

  protected constructor(
    modules: {
      tradeModule: AbstractTradeModule<AbstractExchangeClient<Domain, ExchangeApiType>>
      infoModule: AbstractInfoModule<AbstractExchangeClient<Domain, ExchangeApiType>>
      translator: AbstractDomainMapper<AbstractExchangeClient<Domain, ExchangeApiType>>
    },
    api: ExchangeApiType
  ) {
    this.api = api
    this.tradeModule = modules.tradeModule
    this.infoModule = modules.infoModule
    this.translator = modules.translator
    this.tradeModule.setExchangeClient(this)
    this.infoModule.setExchangeClient(this)
    this.translator.setExchangeClient(this)
    this.initAccount()
  }

  protected abstract initAccount(): Promise<unknown>

  abstract getPortfolio(): Promise<GetSecurityBalanceType<Domain>[]>

  abstract getCurrenciesBalance(): Promise<GetCurrencyBalanceType<Domain>[]>
}
