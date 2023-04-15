import { DataSource } from 'typeorm'
import { Order } from 'src/domain'

export function initOrdersRepository(datasource: DataSource) {
  return datasource.getRepository(Order)
}
