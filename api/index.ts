import {Router} from "express";

const router = Router();

router.get('/', function (req, res) {
    res.send('This is tradebot v0.1.0')
})

import {algosRouter} from "./AlgosRouter";
router.use('/algos', algosRouter)

export const apiRouter = router
