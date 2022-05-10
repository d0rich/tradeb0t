import {Router} from "express"
import { tradeBot } from "./support.functions";

const router = Router();

router.get('/portfolio', (async (req, res) => {
  const portfolio = await tradeBot(req).analyzer.getPortfolio()
  res.send(portfolio)
}))

router.post('/portfolio', (async (req, res) => {
  const portfolio = await tradeBot(req).analyzer.updatePortfolio()
  res.send(portfolio)
}))

router.get('/currencies', (async (req, res) => {
  const currencies = await tradeBot(req).analyzer.getCurrencies()
  res.send(currencies)
}))

router.post('/currencies', (async (req, res) => {
  const currencies = await tradeBot(req).analyzer.updateCurrencies()
  res.send(currencies)
}))

router.get('/securities', (async (req, res) => {
  const securities = await tradeBot(req).analyzer.getSecurities()
  res.send(securities)
}))

router.post('/securities', (async (req, res) => {
  const securities = await tradeBot(req).analyzer.updateSecurities()
  res.send(securities)
}))



export const stateRouter = router
