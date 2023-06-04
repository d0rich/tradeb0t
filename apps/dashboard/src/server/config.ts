import type { BotInitOptions } from './models/Bot'

export const config = {
  bots: [
    {
      host: process.env.DEMO_STUB_HOST || 'localhost',
      port: +(process.env.DEMO_STUB_PORT ?? 4268),
      name: 'tradebot',
      token: process.env.DEMO_STUB_TOKEN || 'qwerty123'
    }
  ] satisfies BotInitOptions[]
}
