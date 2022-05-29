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

router.get('/instruments', (async (req, res) => {
  const instruments = await tradeBot(req).analyzer.getInstruments()
  res.send(instruments)
}))

router.post('/instruments', (async (req, res) => {
  const instruments = await tradeBot(req).analyzer.updateInstruments()
  res.send(instruments)
}))



export const stateRouter = router
