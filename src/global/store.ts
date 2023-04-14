import { db, store } from '../storage'
import { LoggerService } from '../bot'

export const globalStore = {
  db: db,
  store: store,
  logger: null as LoggerService | null,
  config: {}
}
