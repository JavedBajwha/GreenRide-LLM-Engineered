import { prisma } from '../../lib/prisma.js'
import { calculateQuotePrice } from '../pricing/pricing.service.js'

export async function generateQuotesV2(tenantId: string, baseInput: {
  pickupLocation: string
  dropoffLocation: string
  pickupAt: Date
}) {
  const vehicles = await prisma.vehicle.findMany({
    where: { tenantId, isActive: true }
  })

  let categories = [...new Set(vehicles.map(v => v.category))]

  if (categories.length === 0) {
    categories = ['saloon', 'mpv', 'executive'] as any
  }

  const results = []

  for (const category of categories) {
    const price = await calculateQuotePrice({
      tenantId,
      vehicleCategory: category
    })

    const quote = await prisma.quote.create({
      data: {
        tenantId,
        pickupLocation: baseInput.pickupLocation,
        dropoffLocation: baseInput.dropoffLocation,
        pickupAt: baseInput.pickupAt,
        vehicleCategory: category,
        estimatedPrice: price
      }
    })

    results.push(quote)
  }

  return results
}
