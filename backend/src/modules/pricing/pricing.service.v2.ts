import { prisma } from '../../lib/prisma.js'
import { estimateJourneyMetrics } from './distance-estimator.service.js'

const DEFAULT_CATEGORY_MULTIPLIER: Record<string, number> = {
  saloon: 1,
  estate: 1.2,
  mpv: 1.5,
  executive: 2,
  minibus: 2.5,
  accessible: 1.6
}

export async function calculateQuotePriceV2(input: {
  tenantId: string
  vehicleCategory: string
  pickupLocation: string
  dropoffLocation: string
}) {
  const metrics = await estimateJourneyMetrics({
    pickupLocation: input.pickupLocation,
    dropoffLocation: input.dropoffLocation
  })

  const rule = await prisma.pricingRule.findFirst({
    where: {
      tenantId: input.tenantId,
      isActive: true
    }
  })

  const baseFare = Number(rule?.baseFare ?? 20)
  const pricePerMile = Number(rule?.pricePerMile ?? 2)
  const pricePerMinute = Number(rule?.pricePerMinute ?? 0.5)
  const minimumFare = Number(rule?.minimumFare ?? 15)

  const multiplier = DEFAULT_CATEGORY_MULTIPLIER[input.vehicleCategory] ?? 1

  const raw = (baseFare + metrics.estimatedDistanceMiles * pricePerMile + metrics.estimatedDurationMinutes * pricePerMinute) * multiplier

  return {
    price: Math.max(minimumFare, Number(raw.toFixed(2))),
    metrics
  }
}
