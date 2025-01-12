import { IPersistentStorage, PersistentStorage } from './persistent'
import { IInMemoryStorage, InMemoryStorage } from './memory'
import type { LoggerService } from 'src/bot'

export class UnitedStorage implements IPersistentStorage, IInMemoryStorage {
  isInitialized = false

  get currencies() {
    return this._memory.currencies
  }

  get portfolio() {
    return this._memory.portfolio
  }

  get securities() {
    return this._memory.securities
  }

  get orders() {
    return this._persistent.orders
  }

  get algorithms() {
    return this._persistent.algorithms
  }

  get algorithmRuns() {
    return this._persistent.algorithmRuns
  }

  private _persistent: IPersistentStorage
  private _memory: IInMemoryStorage

  constructor(private id: string) {
    this._persistent = new PersistentStorage(this.id)
    this._memory = new InMemoryStorage()
  }

  async initialize(loggerService?: LoggerService) {
    await Promise.all([this._persistent.initialize(loggerService), this._memory.initialize(loggerService)])
    this.isInitialized = true
  }
}
