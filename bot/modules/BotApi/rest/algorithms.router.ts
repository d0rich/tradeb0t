import {Router} from "express";
import {OrderDetails} from "../../../../types";
import { tradeBot } from "./support.functions";

const router = Router();

router.get('/', (req, res) => {
    res.send(tradeBot(req).analyzer.tradeAlgos.description)
})

router.post('/slicing', (req, res) => {
    const bigOrder: OrderDetails = req.body['order']
    const parts: number = req.body['parts']
    const minutes: number = req.body['minutes']
    tradeBot(req).analyzer.tradeAlgos.slicing(bigOrder, parts, minutes )
    res.status(200)
    res.send()
})

export const algosRouter = router
