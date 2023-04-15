import type { initAlgorithmsRepository } from './AlgorithmsRepository'
import type { initAlgorithmRunsRepository } from './AlgorithmRunsRepository'
import type { initOrdersRepository } from './OrdersRepository'

export interface IPersistentStorage {
  orders: ReturnType<typeof initOrdersRepository>
  algorithms: ReturnType<typeof initAlgorithmsRepository>
  algorithmRuns: ReturnType<typeof initAlgorithmRunsRepository>
}
