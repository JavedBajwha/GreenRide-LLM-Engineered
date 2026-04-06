import { Router } from 'express'
import bookingRoutes from '../modules/booking/booking.routes.js'

const router = Router()

router.use('/booking', bookingRoutes)

export default router
