import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'
import { AlgorithmsRepository } from './AlgorithmsRepository'
import { AlgorithmRunsRepository } from './AlgorithmRunsRepository'
import { OrdersRepository } from './OrdersRepository'
import { IPersistentStorage } from './IPersistentStorage'

export class PersistentStorage implements IPersistentStorage {
  isInitialized = false

  readonly orders: OrdersRepository
  readonly algorithms: AlgorithmsRepository
  readonly algorithmRuns: AlgorithmRunsRepository

  constructor(private id: string) {
    this.datasource = new DataSource({
      type: 'better-sqlite3',
      database: `./storage-${this.id}.db`,
      logging: false,
      synchronize: true,
      entities: [Algorithm, AlgorithmRun, Order]
    })
    this.orders = new OrdersRepository(Order, this.datasource.manager)
    this.algorithms = new AlgorithmsRepository(AlgorithmRun, this.datasource.manager)
    this.algorithmRuns = new AlgorithmRunsRepository(AlgorithmRun, this.datasource.manager)
  }

  async initialize() {
    await this.datasource.initialize()
    this.isInitialized = true
  }

  private datasource: DataSource
}
