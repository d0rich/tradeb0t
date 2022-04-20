import OpenAPI from '@tinkoff/invest-openapi-js-sdk';
import { C_ExchangeApi, C_Portfolio } from '../types/ExchangeApi.t';

import { IExchangeAccount, IExchangeInfo, IExchangeTrade } from "./interfaces";
import { InfoModule, TradeModule } from './modules';

export class ExchangeClient implements IExchangeAccount {
  private readonly _api: C_ExchangeApi
  private readonly _tradeModule: TradeModule
  private readonly _infoModule: InfoModule
  private _isAccountInitialized: boolean = false

  constructor(token: string){
    this._api = new OpenAPI({
        apiURL: 'https://api-invest.tinkoff.ru/openapi/sandbox',
        socketURL: 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws',
        secretToken: token
    })
    this._infoModule = new InfoModule(this)
    this._tradeModule = new TradeModule(this)
    this.initAccount()
  }

  private async initAccount(){
    await this._api.sandboxClear()
    await this._api.setCurrenciesBalance({ currency: 'USD', balance: 1_000_000 })
    // @ts-ignore
    const { figi: appleFigi } = await this._api.searchOne({ ticker: 'AAPL' })
    await this._api.setPositionBalance({ balance: 100, figi: appleFigi })
    this._isAccountInitialized = true
  }
  
  public get isAccountInitialized(): boolean { return this._isAccountInitialized }
  public get tradeModule(): TradeModule { return this._tradeModule }
  public get infoModule(): InfoModule { return this._infoModule }
  public get api(): C_ExchangeApi { return this._api }
  
  public async metaInfo(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async portfolio(): Promise<C_Portfolio> {
    return await this.api.portfolio()
  }
}