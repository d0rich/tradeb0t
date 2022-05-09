import {Router} from "express";
import {OrderDetails} from "../../../../types";

const router = Router();

router.get('/', (req, res) => {
    res.send(req.app.get('tradeBot').analyzer.tradeAlgos.description)
})

router.post('/slicing', (req, res) => {
    const bigOrder: OrderDetails = req.body['order']
    const parts: number = req.body['parts']
    const minutes: number = req.body['minutes']
    req.app.get('tradeBot').analyzer.tradeAlgos.slicing(bigOrder, parts, minutes )
    res.status(200)
    res.send()
})

export const algosRouter = router
