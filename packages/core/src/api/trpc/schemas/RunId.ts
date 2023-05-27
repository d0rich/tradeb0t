import { z } from 'zod'

export const ZRunId = z.number().int().min(0)
