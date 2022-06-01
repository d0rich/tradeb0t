import {Router} from "express";
import { getTradeBotFromExpress } from "../../../../utils";

const router = Router();

router.get('/check', ((req, res) => {
    if (getTradeBotFromExpress(req).auth.authByRequest(req)) {
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
