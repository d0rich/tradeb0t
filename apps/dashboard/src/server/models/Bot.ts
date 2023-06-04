import { initHTTPServerClient, initWSClient } from '@tradeb0t/core'
import { eventEmitter } from '../socketio/eventEmitter'
export interface BotInitOptions {
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
  readonly httpClient: ReturnType<typeof initHTTPServerClient>
  readonly wsClient: ReturnType<typeof initWSClient>

  constructor({ name, host, port, token }: BotInitOptions) {
    this.name = name
    this.host = host
    this.port = port
    this.token = token

    this.httpClient = initHTTPServerClient({ host, port, token })
    this.wsClient = initWSClient({ host, port })
    this.wsClient.log.onEvent.subscribe(
      { auth: { token: this.token } },
      {
        onData(value) {
          eventEmitter.emit(`log:${host}:${port}`, value)
          eventEmitter.emit(`log:all`, value)
        }
      }
    )
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
