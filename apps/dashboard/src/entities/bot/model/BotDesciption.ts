import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/src/server/routers/_app'

export type BotDesciption = inferRouterOutputs<AppRouter>['repository']['getBots'][number]
