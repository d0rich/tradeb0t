import type { AlgorithmsRepository } from './AlgorithmsRepository'
import type { AlgorithmRunsRepository } from './AlgorithmRunsRepository'
import type { OrdersRepository } from './OrdersRepository'
import type { LoggerService } from 'src/bot'

export interface IPersistentStorage {
  orders: OrdersRepository
  algorithms: AlgorithmsRepository
  algorithmRuns: AlgorithmRunsRepository

  isInitialized: boolean
  initialize(loggerService?: LoggerService): Promise<void>
}
