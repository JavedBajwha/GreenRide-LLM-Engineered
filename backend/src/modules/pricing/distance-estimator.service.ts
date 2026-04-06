export type DistanceEstimate = {
  estimatedDistanceMiles: number
  estimatedDurationMinutes: number
  source: 'fallback_estimator'
}

export async function estimateJourneyMetrics(input: {
  pickupLocation: string
  dropoffLocation: string
}): Promise<DistanceEstimate> {
  const pickup = input.pickupLocation.trim().toLowerCase()
  const dropoff = input.dropoffLocation.trim().toLowerCase()

  if (pickup === dropoff) {
    return {
      estimatedDistanceMiles: 1,
      estimatedDurationMinutes: 5,
      source: 'fallback_estimator'
    }
  }

  const combinedLength = Math.max(pickup.length + dropoff.length, 10)
  const estimatedDistanceMiles = Math.min(Math.max(Math.round(combinedLength / 6), 3), 35)
  const estimatedDurationMinutes = estimatedDistanceMiles * 3

  return {
    estimatedDistanceMiles,
    estimatedDurationMinutes,
    source: 'fallback_estimator'
  }
}
