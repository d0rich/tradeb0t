import {Router} from "express"
import { tradeBot } from "../..";

const router = Router();

router.get('/portfolio', (async (req, res) => {
  const portfolio = await tradeBot.analyzer.getPortfolio()
  res.send(portfolio)
}))

router.post('/portfolio', (async (req, res) => {
  const portfolio = await tradeBot.analyzer.updatePortfolio()
  res.send(portfolio)
}))

router.get('/currencies', (async (req, res) => {
  const currencies = await tradeBot.analyzer.getCurrencies()
  res.send(currencies)
}))

router.post('/currencies', (async (req, res) => {
  const currencies = await tradeBot.analyzer.updateCurrencies()
  res.send(currencies)
}))

router.get('/securities', (async (req, res) => {
  const securities = await tradeBot.analyzer.getSecurities()
  res.send(securities)
}))

router.post('/securities', (async (req, res) => {
  const securities = await tradeBot.analyzer.updateSecurities()
  res.send(securities)
}))



export const stateRouter = router
