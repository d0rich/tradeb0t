import 'dotenv/config'

export interface ITradeBotConfig {
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
