const express = require('express')
const app = express()
app.use(express.json())

import {TradeBot} from "./bot/TradeBot";
export const tradeBot = new TradeBot()

import {apiRouter} from "./api";
app.use('/api', apiRouter)

app.listen(4268)
console.info('We are online on http://localhost:4268/')
