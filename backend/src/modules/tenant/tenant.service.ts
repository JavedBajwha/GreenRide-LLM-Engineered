import { Tenant } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'

// Statuses that are allowed to generate quotes.
// live            — tenant is operational
// ready_for_testing — tenant is in pre-launch testing (Decision 011a Amendment 4)
const QUOTABLE_STATUSES = ['live', 'ready_for_testing'] as const

export class TenantNotFoundError extends Error {
  constructor(tenantId: string) {
    super(`Tenant not found or not active: ${tenantId}`)
    this.name = 'TenantNotFoundError'
  }
}

export async function validateActiveTenant(tenantId: string): Promise<Tenant> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId }
  })

  if (!tenant || !QUOTABLE_STATUSES.includes(tenant.status as typeof QUOTABLE_STATUSES[number])) {
    throw new TenantNotFoundError(tenantId)
  }

  return tenant
}
