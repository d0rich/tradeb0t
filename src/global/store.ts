import { store } from '../storage'
import { LoggerService } from '../bot'

export const globalStore = {
  store: store,
  logger: null as LoggerService | null,
  config: {}
}
