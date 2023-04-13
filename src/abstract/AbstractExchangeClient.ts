import { AbstractInfoModule } from './AbstractInfoModule'
import { AbstractTradeModule } from './AbstractTradeModule'
import { AbstractDomainMapper } from './AbstractDomainMapper'
import { DomainTemplate } from '../domain'
import { GetCurrencyBalanceType, GetSecurityBalanceType } from '../domain/extractors'
import { IExchangeClient } from './IExchangeClient'
import { ITradeModule } from './ITradeModule'
import { IInfoModule } from './IInfoModule'
import { IDomainMapper } from './IDomainMapper'

export abstract class AbstractExchangeClient<Domain extends DomainTemplate = DomainTemplate, ExchangeApiType = unknown>
  implements IExchangeClient<Domain, ExchangeApiType>
{
  private _isAccountInitialized = false
  public get isAccountInitialized(): boolean {
    return this._isAccountInitialized
  }
  protected set isAccountInitialized(value: boolean) {
    this._isAccountInitialized = value
  }

  readonly api: ExchangeApiType
  readonly tradeModule: ITradeModule<Domain>
  readonly infoModule: IInfoModule<Domain>
  readonly translator: IDomainMapper<Domain>

  protected constructor(
    modules: {
      tradeModule: ITradeModule<Domain>
      infoModule: IInfoModule<Domain>
      translator: IDomainMapper<Domain>
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
