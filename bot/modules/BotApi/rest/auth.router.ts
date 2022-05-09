import {Router} from "express";

const router = Router();

router.get('/check', ((req, res) => {
    if (req.app.get('tradeBot').auth.authByRequest(req)) {
      res.send({
        status: 'Authorized',
        auth: true
      })
    } else {
      res.send({
        status: 'Not Authorized',
        auth: false
      })
    }
    
    
}))

export const authRouter = router
