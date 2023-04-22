import 'dotenv/config'

export interface ITradeBotConfig {
  meta: {
    id: string
  }
  auth: {
    token: string
    required: boolean
  }
  api: {
    port: number | string
    host: string
  }
  logs: {
    directory: string
  }
}

export const defaultConfig: ITradeBotConfig = {
  meta: {
    id: process.env.BOT_ID || 'tradebot'
  },
  auth: {
    token: process.env.BOT_TOKEN || '',
    required: true
  },
  api: {
    port: 4268,
    host: '0.0.0.0'
  },
  logs: {
    directory: './logs'
  }
}
