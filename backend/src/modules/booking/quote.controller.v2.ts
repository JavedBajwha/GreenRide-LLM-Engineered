import { Request, Response } from 'express'
import { searchQuoteSchema } from './quote.schema.js'
import { generateQuotes } from './quote.service.js'

export async function createQuoteV2(req: Request, res: Response) {
  try {
    const parsed = searchQuoteSchema.parse(req.body)

    const quotes = await generateQuotes(parsed.tenantId, {
      pickupLocation: parsed.pickupLocation,
      dropoffLocation: parsed.dropoffLocation,
      pickupAt: new Date(parsed.pickupAt)
    })

    return res.json({ quotes })
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues })
    }

    console.error(error)
    return res.status(500).json({ error: 'Failed to generate quotes' })
  }
}
