import OpenAPI from '@tinkoff/invest-openapi-js-sdk';
import { C_ExchangeApi, C_Portfolio } from './types/exchangeClient';

import { IExchangeAccount, IExchangeInfo, IExchangeTrade } from "./interfaces/ExchangeClient";
import { InfoModule, TradeModule } from './modules/ExchangeClient';

export class ExchangeClient implements IExchangeAccount {
  public readonly api: C_ExchangeApi
  public readonly tradeModule: TradeModule
  public readonly infoModule: InfoModule
  private _isAccountInitialized: boolean = false
  public get isAccountInitialized(): boolean { return this._isAccountInitialized }
  private set isAccountInitialized(value: boolean) { this._isAccountInitialized = value }

  constructor(token: string){
    this.api = new OpenAPI({
        apiURL: 'https://api-invest.tinkoff.ru/openapi/sandbox',
        socketURL: 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws',
        secretToken: token
    })
    this.infoModule = new InfoModule(this)
    this.tradeModule = new TradeModule(this)
    this.initAccount()
  }

  private async initAccount(){
    await this.api.sandboxClear()
    await this.api.setCurrenciesBalance({ currency: 'USD', balance: 1_000_000 })
    // @ts-ignore
    const { figi: appleFigi } = await this.api.searchOne({ ticker: 'AAPL' })
    await this.api.setPositionBalance({ balance: 100, figi: appleFigi })
    this.isAccountInitialized = true
  }

  public async metaInfo(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async getPortfolio(): Promise<C_Portfolio> {
    return await this.api.portfolio()
  }
}
