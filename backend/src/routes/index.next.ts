import { Router } from 'express'
import quoteRoutes from '../modules/booking/quote.routes.v2.js'

const router = Router()

router.use('/booking', quoteRoutes)

export default router
