import {Router} from "express";
import { tradeBot } from "./support.functions";

const router = Router();

router.get('/check', ((req, res) => {
    if (tradeBot(req).auth.authByRequest(req)) {
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
