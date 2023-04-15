import type { AlgorithmsRepository } from './AlgorithmsRepository'
import type { AlgorithmRunsRepository } from './AlgorithmRunsRepository'
import type { OrdersRepository } from './OrdersRepository'

export interface IPersistentStorage {
  orders: OrdersRepository
  algorithms: AlgorithmsRepository
  algorithmRuns: AlgorithmRunsRepository
}
