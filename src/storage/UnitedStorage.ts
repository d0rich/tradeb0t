import { IPersistentStorage, PersistentStorage } from './persistent'
import { IInMemoryStorage, InMemoryStorage } from './memory'

export class UnitedStorage implements IPersistentStorage, IInMemoryStorage {
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

  private readonly _persistent: IPersistentStorage
  private readonly _memory: IInMemoryStorage

  constructor(id: string) {
    this._persistent = new PersistentStorage(id)
    this._memory = new InMemoryStorage()
  }
}
