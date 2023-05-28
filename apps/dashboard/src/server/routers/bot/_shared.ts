import { z } from 'zod'

export const findBotInput = z.object({
  url: z.string()
})
