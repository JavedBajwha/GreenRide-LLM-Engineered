import { z } from 'zod'

export const searchQuoteSchema = z.object({
  tenantId: z.string().uuid(),
  pickupLocation: z.string().min(3),
  dropoffLocation: z.string().min(3),
  pickupAt: z.string().datetime(),
  tripType: z.enum(['one_way', 'return_trip', 'hourly', 'multi_stop']).default('one_way'),
  passengerCount: z.number().int().min(1).max(16).default(1),
  luggageCount: z.number().int().min(0).max(20).default(0),
  vehicleCategory: z.enum(['saloon', 'estate', 'mpv', 'executive', 'minibus', 'accessible']).optional()
})

export type SearchQuoteInput = z.infer<typeof searchQuoteSchema>
