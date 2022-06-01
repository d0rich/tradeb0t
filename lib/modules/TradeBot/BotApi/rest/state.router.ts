import {Router} from "express"
import {getTradeBotFromExpress, GetOperationsOptions, GetOrdersOptions} from "../../../../utils";

const router = Router();

// Currencies

router.get('/currencies', (async (req, res) => {
  const currencies = await getTradeBotFromExpress(req).analyzer.getCurrencies()
  res.send(currencies)
}))

router.post('/currencies', (async (req, res) => {
  const currencies = await getTradeBotFromExpress(req).analyzer.updateCurrencies()
  res.send(currencies)
}))

// Instruments

router.get('/instruments', (async (req, res) => {
  const instruments = await getTradeBotFromExpress(req).analyzer.getInstruments()
  res.send(instruments)
}))

router.post('/instruments', (async (req, res) => {
  const instruments = await getTradeBotFromExpress(req).analyzer.updateInstruments()
  res.send(instruments)
}))

// Followed Instruments

router.get('/instruments/followed', (async (req, res) => {
  const instruments = await getTradeBotFromExpress(req).analyzer.getFollowedInstruments()
  res.send(instruments)
}))

router.post('/instruments/followed', (async (req, res) => {
  const instruments = await getTradeBotFromExpress(req).analyzer.updateFollowedInstruments()
  res.send(instruments)
}))

router.post('/instruments/follow', (async (req, res) => {
  const instruments = await getTradeBotFromExpress(req).analyzer.followInstrument(req.body.ticker)
  res.send(instruments)
}))

router.post('/instruments/unfollow', (async (req, res) => {
  const instruments = await getTradeBotFromExpress(req).analyzer.unfollowInstrument(req.body.ticker)
  res.send(instruments)
}))

// Portfolio

router.get('/portfolio', (async (req, res) => {
  const portfolio = await getTradeBotFromExpress(req).analyzer.getPortfolio()
  res.send(portfolio)
}))

router.post('/portfolio', (async (req, res) => {
  const portfolio = await getTradeBotFromExpress(req).analyzer.updatePortfolio()
  res.send(portfolio)
}))

router.post('/portfolio/clear', (async (req, res) => {
  const clearedPositions = await getTradeBotFromExpress(req).analyzer.clearPortfolio()
  res.send(clearedPositions)
}))

router.get('/portfolio/:ticker/average-buy-price', (async (req, res) => {
  const price = await getTradeBotFromExpress(req).analyzer.getPositionAverageBuyPrice(req.params.ticker)
  res.send({ ticker: req.params.ticker, price })
}))

// Operations

router.get('/operations', (async (req, res) => {
  const options: GetOperationsOptions = {
    from: req.query['from'] ? new Date(String(req.query['from']) ) : undefined,
    to: req.query['to'] ? new Date(String(req.query['to']) ) : undefined,
    instrumentTicker: req.query['instrumentTicker'] ? String(req.query['instrumentTicker']) : undefined,
  }
  switch (String(req.query['operation'])) {
    case 'buy':
      options.operation = "buy"
      break
    case 'sell':
      options.operation = "sell"
      break
  }
  const portfolio = await getTradeBotFromExpress(req).analyzer.getOperations(options)
  res.send(portfolio)
}))

router.post('/operations', (async (req, res) => {
  const portfolio = await getTradeBotFromExpress(req).analyzer.updateOperationsAll()
  res.send(portfolio)
}))

router.post('/operations/:ticker', (async (req, res) => {
  const portfolio = await getTradeBotFromExpress(req).analyzer.updateOperationsByInstrument(req.params.ticker)
  res.send(portfolio)
}))

// Orders

router.get('/orders', (async (req, res) => {
  const options: GetOrdersOptions = {
    from: req.query['from'] ? new Date(String(req.query['from']) ) : undefined,
    to: req.query['to'] ? new Date(String(req.query['to']) ) : undefined,
    instrumentTicker: req.query['instrumentTicker'] ? String(req.query['instrumentTicker']) : undefined,
  }
  switch (String(req.query['operation'])) {
    case 'buy':
      options.operation = "buy"
      break
    case 'sell':
      options.operation = "sell"
      break
  }
  const portfolio = await getTradeBotFromExpress(req).analyzer.getOrders(options)
  res.send(portfolio)
}))

export const stateRouter = router
