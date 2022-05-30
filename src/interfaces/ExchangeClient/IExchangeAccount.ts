import { C_Portfolio } from "../../types"

export interface IExchangeAccount {
  get isAccountInitialized(): boolean
  metaInfo(): Promise<any>
  getPortfolio(): Promise<C_Portfolio>
}
