import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma.js'

export async function createQuote(req: Request, res: Response) {
  try {
    const {
      tenantId,
      pickupLocation,
      dropoffLocation,
      pickupAt,
      vehicleCategory
    } = req.body

    // VERY BASIC pricing logic (will improve later)
    const estimatedPrice = 25.0

    const quote = await prisma.quote.create({
      data: {
        tenantId,
        pickupLocation,
        dropoffLocation,
        pickupAt: new Date(pickupAt),
        vehicleCategory,
        estimatedPrice
      }
    })

    return res.json(quote)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to create quote' })
  }
}
