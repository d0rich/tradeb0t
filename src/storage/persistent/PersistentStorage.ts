import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'
import { initAlgorithmsRepository } from './AlgorithmsRepository'
import { initAlgorithmRunsRepository } from './AlgorithmRunsRepository'
import { initOrdersRepository } from './OrdersRepository'
import { IPersistentStorage } from './IPersistentStorage'

export class PersistentStorage implements IPersistentStorage {
  orders: ReturnType<typeof initOrdersRepository>
  algorithms: ReturnType<typeof initAlgorithmsRepository>
  algorithmRuns: ReturnType<typeof initAlgorithmRunsRepository>
  private readonly datasource: DataSource

  constructor(id: string) {
    this.datasource = this.initDatasource(id)
    this.orders = initOrdersRepository(this.datasource)
    this.algorithms = initAlgorithmsRepository(this.datasource)
    this.algorithmRuns = initAlgorithmRunsRepository(this.datasource)
  }

  private initDatasource(id: string) {
    return new DataSource({
      type: 'better-sqlite3',
      database: `./storage-${id}.db`,
      logging: false,
      synchronize: true,
      entities: [Algorithm, AlgorithmRun, Order]
    })
  }
}
