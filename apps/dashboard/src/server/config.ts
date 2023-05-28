import type { BotInitOptions } from './models/Bot'

export const config = {
  bots: [
    {
      host: 'localhost',
      port: 4268,
      name: 'Test Bot',
      token: 'qwerty123'
    }
  ] satisfies BotInitOptions[]
}
