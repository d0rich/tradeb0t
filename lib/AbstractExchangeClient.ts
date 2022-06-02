import OpenAPI from '@tinkoff/invest-openapi-js-sdk';
import {C_ExchangeApi, C_Operation, C_Portfolio} from '../src/exchangeClientTypes';

import {AbstractInfoModule} from "./modules/AbstractExchangeClient/AbstractInfoModule";
import {AbstractTradeModule} from "./modules/AbstractExchangeClient/AbstractTradeModule";

export abstract class AbstractExchangeClient {
  abstract readonly api: C_ExchangeApi
  abstract readonly tradeModule: AbstractTradeModule
  abstract readonly infoModule: AbstractInfoModule
  private _isAccountInitialized: boolean = false
  public get isAccountInitialized(): boolean { return this._isAccountInitialized }
  protected set isAccountInitialized(value: boolean) { this._isAccountInitialized = value }


  protected abstract initAccount(): Promise<unknown>

  abstract getPortfolio(): Promise<C_Portfolio>

  abstract getOperationsAll(from: Date, to: Date): Promise<C_Operation[]>

  abstract getOperationsBySecurity(ticker: string, from: Date, to: Date): Promise<C_Operation[]>
}
