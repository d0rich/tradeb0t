import {Router} from "express";

const router = Router();

router.get('/', function (req, res) {
    res.send('This is tradebot v0.1.0')
})

import {algosRouter} from "./algorithms.router";
import { stateRouter } from "./state.router";
router.use('/algos', algosRouter)
router.use('/state', stateRouter)

export const apiRouter = router
