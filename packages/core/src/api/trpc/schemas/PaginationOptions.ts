import { z } from 'zod'

export const ZPaginationOptions = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10)
})

export type PaginationOptions = z.infer<typeof ZPaginationOptions>
