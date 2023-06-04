import type { BotInitOptions } from './models/Bot'

function getStubHostFromEnv() {
  const envDomain = process.env.DEMO_STUB_HOST
  if (envDomain) {
    return `${envDomain}.onrender.com`
  }
}

export const config = {
  bots: [
    {
      host: getStubHostFromEnv() || 'localhost',
      port: +(process.env.DEMO_STUB_PORT ?? 4268),
      name: 'tradebot',
      token: process.env.DEMO_STUB_TOKEN || 'qwerty123'
    }
  ] satisfies BotInitOptions[]
}
