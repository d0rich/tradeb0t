import type { BotInitOptions } from "./models/Bot"

export default {
  bots: [
    {
      host: 'localhost',
      port: 4268,
      name: 'Test Bot',
      token: 'qwerty123'
    }
  ] satisfies BotInitOptions[]
}
