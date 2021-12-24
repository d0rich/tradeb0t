const express = require('express')
const app = express()

import {TradeBot} from "./lib/TradeBot";
export const tradeBot = new TradeBot()

import {apiRouter} from "./api";
app.use('/api', apiRouter)

app.listen(4268)
console.info('We are online on http://localhost:4268/')