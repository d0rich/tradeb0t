import 'dotenv/config'
import { DeepPartial } from 'typeorm'
import {defu} from 'defu'

export type ConfigOpts<TExchange = unknown> = {
  exchange: TExchange
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

const defaultConfig: ConfigOpts = {
  exchange: {},
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

const globalState = {
  config: defaultConfig
}

export const useConfig = <TExchange = unknown>(config: DeepPartial<ConfigOpts<TExchange>> | null = null) => {
  if (config) {
    globalState.config = defu(config, globalState.config)
  }
  return globalState.config
}
