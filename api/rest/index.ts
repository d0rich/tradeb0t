import {Router} from "express";
const express = require('express')
const app = express()
app.use(express.json())

// create routes
const router = Router();

router.get('/', function (req, res) {
    res.send('This is tradebot v0.1.0')
})

import {algosRouter} from "./algorithms.router";
import { stateRouter } from "./state.router";
router.use('/algos', algosRouter)
router.use('/state', stateRouter)

app.use('/api', router)

// export app
export const restApi = app
