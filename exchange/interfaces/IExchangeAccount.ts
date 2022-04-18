import { RA_Portfolio } from "../../types"

export interface IExchangeAccount {
  get isAccountInitialized(): boolean
  metaInfo(): Promise<any>
  portfolio(): Promise<RA_Portfolio>
}