import { prisma } from '../../lib/prisma.js'

const CATEGORY_MULTIPLIER = {
  saloon: 1,
  estate: 1.2,
  mpv: 1.5,
  executive: 2,
  minibus: 2.5,
  accessible: 1.6
}

export async function generateQuotes(tenantId: string, baseInput: {
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

  const baseFare = 20

  const results = []

  for (const category of categories) {
    const multiplier = CATEGORY_MULTIPLIER[category] || 1
    const price = baseFare * multiplier

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
