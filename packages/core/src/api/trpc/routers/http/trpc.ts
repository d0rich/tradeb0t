import { inferAsyncReturnType, initTRPC } from '@trpc/server'
export const createContext = () => ({}) // no context
type Context = inferAsyncReturnType<typeof createContext>
const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
