import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { TRPCRouterHTTP, TRPCRouterWS } from '@tradeb0t/core'
import { createOFetchLink } from '../utils/trpc/links/ofetch'

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
  readonly httpClient: ReturnType<typeof createTRPCProxyClient<TRPCRouterHTTP>>
  //readonly wsClient: ReturnType<typeof initWSClient>

  constructor({ name, host, port, token }: BotInitOptions) {
    this.name = name
    this.host = host
    this.port = port
    this.token = token

    this.httpClient = createTRPCProxyClient<TRPCRouterHTTP>({
      links: [
        createOFetchLink({
          url: `http://${host}:${port}/api/trpc`
        })
      ]
    })
    //this.wsClient = initWSClient({ host, port })
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