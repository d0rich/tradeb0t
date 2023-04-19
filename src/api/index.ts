import http from 'http'
import ws from 'ws'
import { toNodeListener } from 'h3'
import { initH3 } from './h3'
import { registerH3Routes, registerWSSHandler } from './trpc'
import { ITradeBot } from 'src/bot'

export * from './trpc'
export * from './h3'

export async function initH3WithWss(tradeBot: ITradeBot) {
  const h3 = initH3(tradeBot)
  await registerH3Routes({
    tradeBot: tradeBot,
    h3App: h3
  })
  const httpServer = http.createServer(toNodeListener(h3))
  const wss = new ws.Server({
    server: httpServer
  })
  registerWSSHandler({
    wss: wss,
    tradeBot: tradeBot
  })
  return httpServer
}
