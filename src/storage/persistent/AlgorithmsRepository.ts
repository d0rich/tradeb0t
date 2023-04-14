import { DataSource } from "typeorm"
import { Algorithm } from "src/domain"

export function initAlgorithmsRepository(datasource: DataSource) {
  return datasource.getRepository(Algorithm)
}
