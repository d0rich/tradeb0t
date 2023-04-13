import { NextFunction, Request, Response, Router } from 'express'
import { getTradeBotFromExpress } from '../../../../../utils/express'
import { authRouter } from './auth.router'

const router = Router()

router.use('/auth', authRouter)

router.use((req: Request, res: Response, next: NextFunction) => {
  if (getTradeBotFromExpress(req).auth.authByRequest(req)) next()
  else {
    getTradeBotFromExpress(req).logger.log(
      {
        type: 'warning',
        message: `Unauthorized HTTP request: ${req.method} /api${req.path}`,
        attachment: {
          remote: req.socket.remoteAddress,
          params: req.query,
          body: req.body
        }
      },
      { internal: true }
    )
    res.status(401).send('Error: Not Authorized')
  }
})

export const apiRouter = router
