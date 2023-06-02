import { BotsRepository as BotsRepositoryClass } from './BotsRepository'
import { config } from '../config'

let BotsRepository: BotsRepositoryClass

// At this moment I am starting hating Next.js
// @ts-ignore
if (!global.BotsRepository) {
  BotsRepository = new BotsRepositoryClass()
  BotsRepository.loadFromConfig(config.bots)
  // @ts-ignore
  global.BotsRepository = BotsRepository
} else {
  // @ts-ignore
  BotsRepository = global.BotsRepository
}

export { BotsRepository }
