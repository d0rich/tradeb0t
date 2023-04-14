import { DataSource } from 'typeorm'
import { AlgorithmRun, Algorithm, Order } from 'src/domain'

export const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: './storage.db',
  logging: false,
  synchronize: true,
  entities: [Algorithm, AlgorithmRun, Order]
})
