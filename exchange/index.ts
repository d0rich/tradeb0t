import OpenAPI from '@tinkoff/invest-openapi-js-sdk';

import { IExchangeAccount, IExchangeInfo, IExchangeTrade } from "./interfaces";

export class ExchangeApi implements IExchangeAccount, IExchangeInfo, IExchangeTrade {
  private readonly _api: OpenAPI
  private _isAccountInitialized: boolean = false

  constructor(token: string){
    this._api = new OpenAPI({
        apiURL: 'https://api-invest.tinkoff.ru/openapi/sandbox',
        socketURL: 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws',
        secretToken: token
    })
    this.initAccount()
  }

  private async initAccount(){
    await this._api.sandboxClear()
    await this._api.setCurrenciesBalance({ currency: 'USD', balance: 1_000_000 })
    this._isAccountInitialized = true
  }
  
  public get isAccountInitialized(): boolean { return this._isAccountInitialized }
  public async getMetaInfo(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async getPortfolio(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async sell(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async buy(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async sellOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async buyOrCancel(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
}