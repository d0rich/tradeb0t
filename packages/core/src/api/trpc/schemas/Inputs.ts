import { z } from 'zod'
import { ZCreateOrderOptions } from './CreateOrderOptions'

export const ZInputs = z.record(z.date().or(z.string()).or(z.number()).or(ZCreateOrderOptions))

export type Inputs = z.infer<typeof ZInputs>
