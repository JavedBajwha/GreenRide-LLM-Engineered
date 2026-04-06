import { Router } from 'express'
import { createQuote } from './booking.controller.js'

const router = Router()

router.post('/quote', createQuote)

export default router
