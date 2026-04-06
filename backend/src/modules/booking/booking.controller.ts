import { Request, Response } from 'express'
import { searchQuoteSchema } from './booking.schema.js'
import { generateQuotes } from './booking.service.js'
import { validateActiveTenant, TenantNotFoundError } from '../tenant/tenant.service.js'

export async function createQuote(req: Request, res: Response): Promise<void> {
  // Step 1 — validate request shape
  let parsed

  try {
    parsed = searchQuoteSchema.parse(req.body)
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error?.issues ?? []
    })
    return
  }

  // Step 2 — validate tenant exists and is active, then generate quotes
  try {
    await validateActiveTenant(parsed.tenantId)
    const quotes = await generateQuotes(parsed)

    res.json({
      success: true,
      quotes
    })
  } catch (error: any) {
    if (error instanceof TenantNotFoundError) {
      res.status(404).json({
        success: false,
        error: 'Tenant not found or not active'
      })
      return
    }

    console.error(error)
    res.status(500).json({
      success: false,
      error: 'Failed to generate quotes'
    })
  }
}
