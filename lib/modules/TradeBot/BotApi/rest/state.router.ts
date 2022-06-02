import {Router} from "express"
import {getTradeBotFromExpress, GetOperationsOptions, GetOrdersOptions, stringToOperationType} from "../../../../utils";

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

// Securities

router.get('/securities', (async (req, res) => {
  const securities = await getTradeBotFromExpress(req).analyzer.getSecurities()
  res.send(securities)
}))

router.post('/securities', (async (req, res) => {
  const securities = await getTradeBotFromExpress(req).analyzer.updateSecurities()
  res.send(securities)
}))

// Followed Securities

router.get('/securities/followed', (async (req, res) => {
  const securities = await getTradeBotFromExpress(req).analyzer.getFollowedSecurities()
  res.send(securities)
}))

router.post('/securities/followed', (async (req, res) => {
  const securities = await getTradeBotFromExpress(req).analyzer.updateFollowedSecurities()
  res.send(securities)
}))

router.post('/securities/follow', (async (req, res) => {
  const securities = await getTradeBotFromExpress(req).analyzer.followSecurity(req.body.ticker)
  res.send(securities)
}))

router.post('/securities/unfollow', (async (req, res) => {
  const securities = await getTradeBotFromExpress(req).analyzer.unfollowSecurity(req.body.ticker)
  res.send(securities)
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
    securityTicker: req.query['securityTicker'] ? String(req.query['securityTicker']) : undefined,
    operation: stringToOperationType(String(req.query['operation']))
  }
  const portfolio = await getTradeBotFromExpress(req).analyzer.getOperations(options)
  res.send(portfolio)
}))

router.post('/operations', (async (req, res) => {
  const portfolio = await getTradeBotFromExpress(req).analyzer.updateOperationsAll()
  res.send(portfolio)
}))

router.post('/operations/:ticker', (async (req, res) => {
  const portfolio = await getTradeBotFromExpress(req).analyzer.updateOperationsBySecurity(req.params.ticker)
  res.send(portfolio)
}))

// Orders

router.get('/orders', (async (req, res) => {
  const options: GetOrdersOptions = {
    from: req.query['from'] ? new Date(String(req.query['from']) ) : undefined,
    to: req.query['to'] ? new Date(String(req.query['to']) ) : undefined,
    securityTicker: req.query['securityTicker'] ? String(req.query['securityTicker']) : undefined,
    operation: stringToOperationType(String(req.query['operation']))
  }
  const portfolio = await getTradeBotFromExpress(req).analyzer.getOrders(options)
  res.send(portfolio)
}))

export const stateRouter = router
