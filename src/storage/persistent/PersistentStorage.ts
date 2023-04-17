import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'
import { AlgorithmsRepository } from './AlgorithmsRepository'
import { AlgorithmRunsRepository } from './AlgorithmRunsRepository'
import { OrdersRepository } from './OrdersRepository'
import { IPersistentStorage } from './IPersistentStorage'

export class PersistentStorage implements IPersistentStorage {
  isInitialized = false

  get orders() {
    return this._orders
  }

  get algorithms() {
    return this._algorithms
  }

  get algorithmRuns() {
    return this._algorithmRuns
  }

  private _orders: OrdersRepository
  private _algorithms: AlgorithmsRepository
  private _algorithmRuns: AlgorithmRunsRepository

  constructor(private id: string) {
    this.datasource = new DataSource({
      type: 'better-sqlite3',
      database: `./storage-${this.id}.db`,
      logging: false,
      synchronize: true,
      entities: [Algorithm, AlgorithmRun, Order]
    })

  }

  async initialize() {
    await this.datasource.initialize()
    this._orders = new OrdersRepository(Order, this.datasource.manager)
    this._algorithms = new AlgorithmsRepository(AlgorithmRun, this.datasource.manager)
    this._algorithmRuns = new AlgorithmRunsRepository(AlgorithmRun, this.datasource.manager)
    this.isInitialized = true
  }

  private datasource: DataSource
}
