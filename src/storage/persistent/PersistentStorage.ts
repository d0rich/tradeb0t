import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'
import { AlgorithmsRepository } from './AlgorithmsRepository'
import { AlgorithmRunsRepository } from './AlgorithmRunsRepository'
import { OrdersRepository } from './OrdersRepository'
import { IPersistentStorage } from './IPersistentStorage'

export class PersistentStorage implements IPersistentStorage {
  orders: OrdersRepository
  algorithms: AlgorithmsRepository
  algorithmRuns: AlgorithmRunsRepository
  private readonly datasource: DataSource

  constructor(id: string) {
    this.datasource = this.initDatasource(id)
    this.orders = new OrdersRepository(Order, this.datasource.manager)
    this.algorithms = new AlgorithmsRepository(AlgorithmRun, this.datasource.manager)
    this.algorithmRuns = new AlgorithmRunsRepository(AlgorithmRun, this.datasource.manager)
  }

  private initDatasource(id: string) {
    const datasource = new DataSource({
      type: 'better-sqlite3',
      database: `./storage-${id}.db`,
      logging: false,
      synchronize: true,
      entities: [Algorithm, AlgorithmRun, Order]
    })
    datasource.initialize()
    // TODO: remove this hack
    // Wait for datasource to be initialized
    while (!datasource.isInitialized) {
      continue
    }
    return datasource
  }
}
