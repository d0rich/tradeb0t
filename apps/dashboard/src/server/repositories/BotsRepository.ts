import { Bot, BotInitOptions } from '../models/Bot'

export class BotsRepository {
  readonly bots: Bot[] = []

  constructor() {}

  findBotByUrl(url: string) {
    return this.bots.find((bot) => `${bot.host}:${bot.port}` === url)
  }

  loadFromConfig(config: BotInitOptions[]) {
    for (const botConfig of config) {
      this.bots.push(new Bot(botConfig))
    }
  }
}
