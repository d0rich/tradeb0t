import express from 'express'
import cors from 'cors'
import { apiRouter } from './routers'
import { ITradeBot } from 'src/bot'
import { getTradeBotFromExpress } from './utils'

export function initExpress(tradeBot: ITradeBot) {
  const app = express()
  app.use(express.json())
  app.use(cors())

  // FIXME: get version of package in correct way
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require('../../../package.json')

  app.use((req, res, next) => {
    getTradeBotFromExpress(req).logger.log(
      {
        type: 'info',
        message: `Incoming HTTP request: ${req.method} ${req.path}`,
        attachment: {
          remote: req.socket.remoteAddress,
          params: req.query,
          body: req.body
        }
      },
      { internal: true }
    )
    next()
  })

  app.get('/', function (req, res) {
    res.send(`This is tradebot v${packageJson.version}`)
  })

  app.use('/api', apiRouter)

  app.set('tradeBot', tradeBot)

  return app
}
