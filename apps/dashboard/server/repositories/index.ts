import { BotsRepository as BotsRepositoryClass } from "./BotsRepository"
import config from "../config"

const BotsRepository = new BotsRepositoryClass()
BotsRepository.loadFromConfig(config.bots)

export { BotsRepository }
