import {Router} from "express";
import {tradeBot} from "../../index";

const router = Router();

router.get('/check', ((req, res) => {
    if (tradeBot.auth.authByRequest(req)) {
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
