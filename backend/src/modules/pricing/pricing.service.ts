import { VehicleCategory } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_MULTIPLIER: Record<string, number> = {
  saloon: 1,
  estate: 1.2,
  mpv: 1.5,
  executive: 2,
  minibus: 2.5,
  accessible: 1.6
}

const DEFAULT_BASE_FARE = 20
const DEFAULT_PRICE_PER_MILE = 2
const DEFAULT_PRICE_PER_MINUTE = 0.5
const DEFAULT_MINIMUM_FARE = 15

// ─── Types ────────────────────────────────────────────────────────────────────

export type PricingInput = {
  tenantId: string
  vehicleCategory: string
  pickupLocation: string
  dropoffLocation: string
}

export type PricingResult = {
  price: number
  estimatedDistanceMiles: number
  estimatedDurationMinutes: number
  pricingSource: 'pricing_rule' | 'fallback'
}

// ─── Distance Estimation ──────────────────────────────────────────────────────
// Owned by pricing per Decision 001. No external maps integration in this slice.

function estimateDistance(
  pickupLocation: string,
  dropoffLocation: string
): { estimatedDistanceMiles: number; estimatedDurationMinutes: number } {
  const pickup = pickupLocation.trim().toLowerCase()
  const dropoff = dropoffLocation.trim().toLowerCase()

  if (pickup === dropoff) {
    return { estimatedDistanceMiles: 1, estimatedDurationMinutes: 5 }
  }

  const combinedLength = Math.max(pickup.length + dropoff.length, 10)
  const estimatedDistanceMiles = Math.min(Math.max(Math.round(combinedLength / 6), 3), 35)
  const estimatedDurationMinutes = estimatedDistanceMiles * 3

  return { estimatedDistanceMiles, estimatedDurationMinutes }
}

// ─── Price Calculation ────────────────────────────────────────────────────────
// Lookup order per Decision 011:
//   1. Category-specific rule (tenantId + vehicleCategory)
//   2. Catch-all rule         (tenantId + vehicleCategory IS NULL)
//   3. Hardcoded platform defaults

export async function calculateQuotePrice(input: PricingInput): Promise<PricingResult> {
  const { estimatedDistanceMiles, estimatedDurationMinutes } = estimateDistance(
    input.pickupLocation,
    input.dropoffLocation
  )

  const categoryRule = await prisma.pricingRule.findFirst({
    where: {
      tenantId: input.tenantId,
      isActive: true,
      vehicleCategory: input.vehicleCategory as VehicleCategory
    }
  })

  const catchAllRule = categoryRule
    ? null
    : await prisma.pricingRule.findFirst({
        where: {
          tenantId: input.tenantId,
          isActive: true,
          vehicleCategory: null
        }
      })

  const rule = categoryRule ?? catchAllRule
  const pricingSource: 'pricing_rule' | 'fallback' = rule ? 'pricing_rule' : 'fallback'

  const baseFare = Number(rule?.baseFare ?? DEFAULT_BASE_FARE)
  const pricePerMile = Number(rule?.pricePerMile ?? DEFAULT_PRICE_PER_MILE)
  const pricePerMinute = Number(rule?.pricePerMinute ?? DEFAULT_PRICE_PER_MINUTE)
  const minimumFare = Number(rule?.minimumFare ?? DEFAULT_MINIMUM_FARE)
  const multiplier = CATEGORY_MULTIPLIER[input.vehicleCategory] ?? 1

  const raw =
    (baseFare +
      estimatedDistanceMiles * pricePerMile +
      estimatedDurationMinutes * pricePerMinute) *
    multiplier

  const price = Math.max(minimumFare, Number(raw.toFixed(2)))

  return { price, estimatedDistanceMiles, estimatedDurationMinutes, pricingSource }
}
