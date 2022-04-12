export interface IExchangeAccount {
  get isAccountInitialized(): boolean
  getMetaInfo(): Promise<any>
  getPortfolio(): Promise<any>
}