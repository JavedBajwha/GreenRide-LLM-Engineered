import { Router } from 'express'
import { createQuoteV3 } from './quote.controller.v3.js'

const router = Router()

router.post('/quote', createQuoteV3)

export default router
