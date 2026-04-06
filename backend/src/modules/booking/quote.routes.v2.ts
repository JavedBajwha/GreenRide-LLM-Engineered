import { Router } from 'express'
import { createQuoteV2 } from './quote.controller.v2.js'

const router = Router()

router.post('/quote', createQuoteV2)

export default router
