import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/src/server/routers/_app'

export type Order = inferRouterOutputs<AppRouter>['control']['orders']['search'][number]
