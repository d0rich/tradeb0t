import { R_Portfolio } from "../../types"

export interface IExchangeAccount {
  get isAccountInitialized(): boolean
  metaInfo(): Promise<any>
  portfolio(): Promise<R_Portfolio>
}