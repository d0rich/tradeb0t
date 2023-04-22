import { WebSocketServer } from 'ws'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { ITradeBot } from 'src/bot'
import { router, createContext } from './trpc'
import { initLogRouter } from './log'

const initWSRouter = (tradebot: ITradeBot) => {
  return router({
    log: initLogRouter(tradebot)
  })
}

export const registerWSSHandler = ({ wss, tradebot }: { wss: WebSocketServer; tradebot: ITradeBot }) => {
  const handler = applyWSSHandler({
    wss,
    router: initWSRouter(tradebot),
    createContext
  })
  return handler
}

export type WSRouter = ReturnType<typeof initWSRouter>
