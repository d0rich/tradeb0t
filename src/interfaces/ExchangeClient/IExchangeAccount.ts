import { C_Portfolio } from "../../utils/orderDetails"

export interface IExchangeAccount {
  get isAccountInitialized(): boolean
  metaInfo(): Promise<any>
  getPortfolio(): Promise<C_Portfolio>
}
