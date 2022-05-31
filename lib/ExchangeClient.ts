import OpenAPI from '@tinkoff/invest-openapi-js-sdk';
import { C_ExchangeApi, C_Portfolio } from '../src/exchangeClientTypes';

import { InfoModule, TradeModule } from './modules';

export class ExchangeClient {
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
    const { api } = this
    await api.sandboxClear()
    await api.setCurrenciesBalance({ currency: 'USD', balance: 1_000_000 })
    // @ts-ignore
    const { figi: appleFigi } = await api.searchOne({ ticker: 'AAPL' })
    await api.setPositionBalance({ balance: 100, figi: appleFigi })
    this.isAccountInitialized = true
  }

  async metaInfo(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getPortfolio(): Promise<C_Portfolio> {
    const { api } = this
    return await api.portfolio()
  }
}
