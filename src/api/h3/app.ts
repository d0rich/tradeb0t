import { ITradeBot } from 'src/bot'
import { createApp, eventHandler, getQuery, readBody, getMethod, createRouter } from 'h3'

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
          attachment: {
            remote: event.node.req.socket.remoteAddress,
            params: getQuery(event),
            body: readBody(event)
          }
        },
        { internal: true }
      )
    })
  })

  // Authorizations
  app.use('/auth/check', eventHandler((event) => {
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


}
