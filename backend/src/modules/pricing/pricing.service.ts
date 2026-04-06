import { prisma } from '../../lib/prisma.js'

const DEFAULT_CATEGORY_MULTIPLIER: Record<string, number> = {
  saloon: 1,
  estate: 1.2,
  mpv: 1.5,
  executive: 2,
  minibus: 2.5,
  accessible: 1.6
}

export async function calculateQuotePrice(input: {
  tenantId: string
  vehicleCategory: string
  estimatedDistanceMiles?: number
  estimatedDurationMinutes?: number
}) {
  const rule = await prisma.pricingRule.findFirst({
    where: {
      tenantId: input.tenantId,
      isActive: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const baseFare = Number(rule?.baseFare ?? 20)
  const pricePerMile = Number(rule?.pricePerMile ?? 2)
  const pricePerMinute = Number(rule?.pricePerMinute ?? 0.5)
  const minimumFare = Number(rule?.minimumFare ?? 15)

  const distanceMiles = input.estimatedDistanceMiles ?? 10
  const durationMinutes = input.estimatedDurationMinutes ?? 20
  const categoryMultiplier = DEFAULT_CATEGORY_MULTIPLIER[input.vehicleCategory] ?? 1

  const calculated = (baseFare + distanceMiles * pricePerMile + durationMinutes * pricePerMinute) * categoryMultiplier

  return Math.max(minimumFare, Number(calculated.toFixed(2)))
}
