import { initWSClient, initHTTPClient } from '@tradeb0t/core'

export type BotInitOptions = {
  name: string
  host: string
  port: number
  token?: string
}

export class Bot {
  name: string
  status: 'Disconnected' | 'Active' | 'Not Authorized' = 'Disconnected'

  readonly host: string
  readonly port: number
  readonly token?: string
  readonly httpClient: ReturnType<typeof initHTTPClient>
  readonly wsClient: ReturnType<typeof initWSClient>

  constructor({ name, host, port, token }: BotInitOptions){
    this.name = name
    this.host = host
    this.port = port
    this.token = token

    this.httpClient = initHTTPClient({ host, port, token })
    this.wsClient = initWSClient({ host, port })
  }

  toExport(): BotInitOptions {
    return {
      name: this.name,
      host: this.host,
      port: this.port,
      token: this.token
    }
  }
}
