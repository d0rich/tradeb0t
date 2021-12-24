import {Router} from "express";
import {tradeBot} from "../index";
import {OrderOptions} from "../lib/types";

const router = Router();

router.post('/slicing', ((req, res) => {
    const bigOrder: OrderOptions = req.body['order']
    const parts: number = req.body['parts']
    const minutes: number = req.body['minutes']
    tradeBot.analyzer.tradeAlgos.slicing(bigOrder, parts, minutes )
    res.status(200)
    res.send()
}))

export const algosRouter = router
