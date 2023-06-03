import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/src/server/routers/_app'

export type CurrencyBalance = inferRouterOutputs<AppRouter>['control']['portfolio']['getCurrencies'][number]
