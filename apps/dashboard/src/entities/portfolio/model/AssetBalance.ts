import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/src/server/routers/_app'

export type AssetBalance = inferRouterOutputs<AppRouter>['control']['portfolio']['update'][number]
