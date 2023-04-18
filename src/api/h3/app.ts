import { ITradeBot } from 'src/bot'
import { createApp, eventHandler, getMethod, createError } from 'h3'
import { getRequestMeta } from './utils'

export function initH3(tradeBot: ITradeBot) {
  const app = createApp()

  // Log all requests
  app.use({
    match: () => true,
    handler: eventHandler((event) => {
      tradeBot.logger.log(
        {
          type: 'info',
          message: `Incoming HTTP request: ${getMethod(event)} ${event.path}`,
          attachment: getRequestMeta(event)
        },
        { internal: true }
      )
    })
  })

  // Authorizations
  app.use('/api/auth/check', eventHandler((event) => {
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
  }))

  app.use({
    match: (url) => url.startsWith('/api/trpc'),
    handler: eventHandler((event) => {
      if (!tradeBot.auth.authByRequest(event.node.req)) {
        tradeBot.logger.log(
          {
            type: 'warning',
            message: `Unauthorized HTTP request: ${getMethod(event)} ${event.path}`,
            attachment: getRequestMeta(event)
          },
          { internal: true }
        )
        createError({
          statusCode: 401,
          message: 'Error: Not Authorized'
        })
      }
    })
  })


  return app
}
