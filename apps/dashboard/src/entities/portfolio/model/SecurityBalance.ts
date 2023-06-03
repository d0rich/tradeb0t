import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/src/server/routers/_app'

export type SecurityBalance = inferRouterOutputs<AppRouter>['control']['portfolio']['getSecurities'][number]
