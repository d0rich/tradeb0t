import { Bot, BotInitOptions } from '../models/Bot'

export class BotsRepository {
  private bots: Bot[] = []

  constructor(){}

  loadFromConfig(config: BotInitOptions[]){
    for (const botConfig of config){
      this.bots.push(new Bot(botConfig))
    }
  }
}
