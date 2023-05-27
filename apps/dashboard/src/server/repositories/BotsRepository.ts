import { Bot, BotInitOptions } from '../models/Bot'

export class BotsRepository {
  readonly bots: Bot[] = []

  constructor() {}

  findBotByUrl(url: string) {
    return this.bots.find((bot) => `${bot.host}:${bot.port}` === url)
  }

  findBotByUrlOrThrow(url: string) {
    const bot = this.findBotByUrl(url)
    if (!bot) {
      throw new Error('Bot not found')
    }
    return bot
  }

  loadFromConfig(config: BotInitOptions[]) {
    for (const botConfig of config) {
      this.bots.push(new Bot(botConfig))
    }
  }
}
