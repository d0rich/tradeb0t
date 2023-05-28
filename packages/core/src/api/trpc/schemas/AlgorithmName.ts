import { z } from 'zod'

export const ZAlgorithmName = z.string()

export type AlgorithmName = z.infer<typeof ZAlgorithmName>
