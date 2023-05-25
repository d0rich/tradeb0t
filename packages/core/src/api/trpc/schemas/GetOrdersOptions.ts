import { z } from 'zod'
import { EOperationType } from 'src/domain'

export const getOrdersOptions = z.object({
  from: z.date().optional(),
  to: z.date().optional(),
  securityTicker: z.string().optional(),
  operation: z.nativeEnum(EOperationType).optional(),
  runId: z.number().int().min(0).optional()
})

type ZGetOrdersOptions = z.infer<typeof getOrdersOptions>

// Interface looks better in UML diagrams
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetOrdersOptions extends ZGetOrdersOptions {}
