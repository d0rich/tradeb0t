import 'dotenv/config'
import merge from 'deepmerge'
import { DeepPartial } from 'typeorm'

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

export const useConfig = <TExchange = unknown>(config: DeepPartial<ConfigOpts<TExchange>> | null = null) => {
  if (config) {
    const keys = Object.keys(config) as (keyof ConfigOpts)[]
    for (const prop of keys) {
      // FIXME: find way to avoid any
      defaultConfig[prop] = merge(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultConfig[prop] as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config[prop] as any
      )
    }
  }
  return defaultConfig
}
