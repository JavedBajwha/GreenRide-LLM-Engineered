import { Router } from 'express'
import { createQuote } from './quote.controller.js'

const router = Router()

router.post('/quote', createQuote)

export default router
