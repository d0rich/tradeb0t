import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'
import { initAlgorithmsRepository } from './AlgorithmsRepository'

export class PersistentStorage {
  ordersRepository: ReturnType<PersistentStorage['initOrdersRepository']>
  algorithmsRepository: ReturnType<typeof initAlgorithmsRepository>
  algorithmRunsRepository: ReturnType<PersistentStorage['initAlgorithmRunsRepository']>
  private datasource: DataSource

  constructor(id: string) {
    this.datasource = this.initDatasource(id)
    this.ordersRepository = this.initOrdersRepository()
    this.algorithmsRepository = initAlgorithmsRepository(this.datasource)
    this.algorithmRunsRepository = this.initAlgorithmRunsRepository()
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

  private initOrdersRepository() {
    return this.datasource.getRepository(Order)
  }

  private initAlgorithmRunsRepository() {
    return this.datasource.getRepository(AlgorithmRun)
  }
}
