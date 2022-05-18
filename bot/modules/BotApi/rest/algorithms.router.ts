import {Router} from "express";
import {OrderDetails} from "../../../../types";
import { tradeBot } from "./support.functions";

const router = Router();

router.get('/', (req, res) => {
    res.send(tradeBot(req).analyzer.tradeAlgos.description)
})

router.post('/:algoritmName', async (req, res) => {
    const algoName = req.params.algoritmName
    const inputs: any = req.body
    res.status(200)
    res.send(await tradeBot(req).analyzer.tradeAlgos.runAlgorithm(algoName, inputs))
})

export const algosRouter = router
