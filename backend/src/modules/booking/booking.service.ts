import { VehicleCategory } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'
import { calculateQuotePrice } from '../pricing/pricing.service.js'
import { SearchQuoteInput } from './booking.schema.js'

// ─── Constants ────────────────────────────────────────────────────────────────
// Used when the tenant has no active Vehicle records (Decision 009).

const PLATFORM_DEFAULT_CATEGORIES: VehicleCategory[] = ['saloon', 'mpv', 'executive']

// ─── Types ────────────────────────────────────────────────────────────────────

export type QuoteResult = {
  id: string
  tenantId: string
  vehicleCategory: string
  pickupLocation: string
  dropoffLocation: string
  pickupAt: Date
  tripType: string
  passengerCount: number
  luggageCount: number
  estimatedPrice: number
  estimatedDistanceMiles: number
  estimatedDurationMinutes: number
  pricingSource: string
}

// ─── Quote Generation ─────────────────────────────────────────────────────────

export async function generateQuotes(input: SearchQuoteInput): Promise<QuoteResult[]> {
  // Category resolution (Decision 011a Amendment 1):
  // - if the caller supplied a specific vehicleCategory, honour it exclusively
  // - otherwise derive categories from active tenant vehicles
  // - if no vehicles exist, use the platform-default fallback list (Decision 009)
  let categories: VehicleCategory[]

  if (input.vehicleCategory) {
    categories = [input.vehicleCategory as VehicleCategory]
  } else {
    const vehicles = await prisma.vehicle.findMany({
      where: { tenantId: input.tenantId, isActive: true }
    })
    const derived = [...new Set(vehicles.map(v => v.category))]
    categories = derived.length > 0 ? derived : PLATFORM_DEFAULT_CATEGORIES
  }

  const results: QuoteResult[] = []

  for (const category of categories) {
    const pricing = await calculateQuotePrice({
      tenantId: input.tenantId,
      vehicleCategory: category,
      pickupLocation: input.pickupLocation,
      dropoffLocation: input.dropoffLocation
    })

    const quote = await prisma.quote.create({
      data: {
        tenantId: input.tenantId,
        pickupLocation: input.pickupLocation,
        dropoffLocation: input.dropoffLocation,
        pickupAt: new Date(input.pickupAt),
        tripType: input.tripType,
        passengerCount: input.passengerCount,
        luggageCount: input.luggageCount,
        vehicleCategory: category,
        estimatedPrice: pricing.price,
        estimatedDistanceMiles: pricing.estimatedDistanceMiles,
        estimatedDurationMinutes: pricing.estimatedDurationMinutes,
        pricingSource: pricing.pricingSource
      }
    })

    // Explicit Decimal → number conversion required (Decision 011a Amendment 2).
    // Prisma returns Decimal objects for @db.Decimal fields; JSON serialisation
    // of those objects does not produce plain numbers.
    results.push({
      id: quote.id,
      tenantId: quote.tenantId,
      vehicleCategory: quote.vehicleCategory,
      pickupLocation: quote.pickupLocation,
      dropoffLocation: quote.dropoffLocation,
      pickupAt: quote.pickupAt,
      tripType: quote.tripType,
      passengerCount: quote.passengerCount,
      luggageCount: quote.luggageCount,
      estimatedPrice: Number(quote.estimatedPrice),
      estimatedDistanceMiles: Number(quote.estimatedDistanceMiles),
      estimatedDurationMinutes: quote.estimatedDurationMinutes ?? 0,
      pricingSource: quote.pricingSource ?? 'fallback'
    })
  }

  return results
}
