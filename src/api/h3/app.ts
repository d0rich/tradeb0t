import { ITradeBot } from 'src/bot'
import { createApp, eventHandler, getMethod, createError, createRouter } from 'h3'
import { getRequestMeta } from './utils'

export function initH3(tradeBot: ITradeBot) {
  const app = createApp()

  // Log all requests
  app.use({
    match: (url) => {
      // This middleware breaks the playground, so we need to exclude it
      return !url.startsWith('/trpc-playground')
    },
    handler: eventHandler(async (event) => {
      tradeBot.logger.debug(`Incoming HTTP request: ${getMethod(event)} ${event.path}: `, await getRequestMeta(event))
    })
  })

  const apiRouter = createRouter()

  // Authorizations
  apiRouter.get(
    '/api/auth/check',
    eventHandler((event) => {
      if (tradeBot.auth.authByRequest(event.node.req)) {
        return {
          status: 'Authorized',
          auth: true
        }
      }
      return {
        status: 'Not Authorized',
        auth: false
      }
    })
  )

  app.use({
    match: (url) => url.startsWith('/api/trpc'),
    handler: eventHandler(async (event) => {
      if (tradeBot.auth.authByRequest(event.node.req)) {
        return
      } else {
        tradeBot.logger.warn(`Unauthorized HTTP request: ${getMethod(event)} ${event.path}: `, await getRequestMeta(event))
        return createError({
          statusCode: 401,
          message: 'Error: Not Authorized'
        })
      }
    })
  })

  app.use(apiRouter)

  return app
}
