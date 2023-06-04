import { WSRouter, HTTPRouter } from './routers'
import superjson from 'superjson'
import fetch from 'node-fetch'
import { createTRPCProxyClient, createWSClient, httpLink, wsLink, CreateTRPCProxyClient } from '@trpc/client'

type ClientOptions = {
  host: string
  port: number
}

type HTTPClientOptions = ClientOptions & {
  token?: string
}

export const initWSClient = ({ host, port }: ClientOptions) => {
  const wsClient = createWSClient({
    url: `ws://${host}:${port}`
  })
  console.log(`ws://${host}:${port} client created`)
  return createTRPCProxyClient<WSRouter>({
    transformer: superjson,
    links: [
      wsLink({
        client: wsClient
      })
    ]
  })
}

export const initHTTPClient = ({ host, port, token }: HTTPClientOptions): CreateTRPCProxyClient<HTTPRouter> => {
  return createTRPCProxyClient<HTTPRouter>({
    transformer: superjson,
    links: [
      httpLink({
        url: `http://${host}:${port}/api/trpc`,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      })
    ]
  })
}

export const initHTTPServerClient = ({ host, port, token }: HTTPClientOptions): CreateTRPCProxyClient<HTTPRouter> => {
  return createTRPCProxyClient<HTTPRouter>({
    transformer: superjson,
    links: [
      httpLink({
        url: `http://${host}:${port}/api/trpc`,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        },
        fetch: fetch
      })
    ]
  })
}

export type TRPCRouterHTTP = HTTPRouter
export type TRPCRouterWS = WSRouter
