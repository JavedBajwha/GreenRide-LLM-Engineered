import { prisma } from '../../lib/prisma.js'
import { calculateQuotePriceV2 } from '../pricing/pricing.service.v2.js'

export async function generateQuotesV3(tenantId: string, baseInput: {
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
    const pricing = await calculateQuotePriceV2({
      tenantId,
      vehicleCategory: category,
      pickupLocation: baseInput.pickupLocation,
      dropoffLocation: baseInput.dropoffLocation
    })

    const quote = await prisma.quote.create({
      data: {
        tenantId,
        pickupLocation: baseInput.pickupLocation,
        dropoffLocation: baseInput.dropoffLocation,
        pickupAt: baseInput.pickupAt,
        vehicleCategory: category,
        estimatedPrice: pricing.price
      }
    })

    results.push({
      ...quote,
      metrics: pricing.metrics
    })
  }

  return results
}
