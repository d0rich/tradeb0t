import {Router} from "express";
import { getTradeBotFromExpress } from "../../../../utils";

const router = Router();

router.get('/', (req, res) => {
    res.send(getTradeBotFromExpress(req).analyzer.tradeAlgos.description)
})

router.post('/:algoritmName', async (req, res) => {
    const algoName = req.params.algoritmName
    const inputs: any = req.body
    res.status(200)
    res.send(await getTradeBotFromExpress(req).analyzer.tradeAlgos.runAlgorithm(algoName, inputs))
})

export const algosRouter = router
