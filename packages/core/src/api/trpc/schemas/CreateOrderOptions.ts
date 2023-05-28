import { z } from 'zod'
import { EOperationType } from 'src/domain'

export const ZCreateOrderOptions = z.object({
  operation: z
    .nativeEnum(EOperationType)
    .or(z.enum(Object.values(EOperationType) as [`${EOperationType}`, ...`${EOperationType}`[]])),
  ticker: z.string(),
  lots: z.number().int().min(0),
  price: z.number().int().min(0)
})

export type CreateOrderOptions = z.infer<typeof ZCreateOrderOptions>
