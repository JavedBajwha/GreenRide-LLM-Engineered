import { Request, Response } from 'express'
import { searchQuoteSchema } from './quote.schema.js'
import { generateQuotesV2 } from './quote.service.v2.js'

export async function createQuoteV3(req: Request, res: Response) {
  try {
    const parsed = searchQuoteSchema.parse(req.body)

    const quotes = await generateQuotesV2(parsed.tenantId, {
      pickupLocation: parsed.pickupLocation,
      dropoffLocation: parsed.dropoffLocation,
      pickupAt: new Date(parsed.pickupAt)
    })

    return res.json({
      success: true,
      quotes
    })
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.issues
      })
    }

    console.error(error)
    return res.status(500).json({
      success: false,
      error: 'Failed to generate quotes'
    })
  }
}
