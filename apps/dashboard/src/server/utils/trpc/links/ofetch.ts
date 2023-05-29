import { ofetch } from 'ofetch'
import { TRPCClientError, TRPCLink } from '@trpc/client'
import type { AnyRouter } from '@trpc/server'
import { observable } from '@trpc/server/observable'

export const createOFetchLink: <TRouter extends AnyRouter>(opts: {
  url: string
  token?: string
}) => TRPCLink<TRouter> =
  ({ url, token }) =>
  () => {
    // here we just got initialized in the app - this happens once per app
    // useful for storing cache for instance
    return ({ next, op }) => {
      // this is when passing the result to the next link
      // each link needs to return an observable which propagates results
      return observable((observer) => {
        console.log('op', op)
        ofetch(`${url}/${op.path}`, {
          method: op.type === 'query' ? 'GET' : 'POST',
          params: op.type === 'query' ? { input: JSON.stringify(op.input as object) } : {},
          body: op.type === 'query' ? undefined : (op.input as object),
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        })
          .then((res) => {
            observer.next(res)
            observer.complete()
          })
          .catch((cause) => {
            console.error('ofetch error', cause)
            observer.error(TRPCClientError.from(cause))
          })
        return () => {}
      })
    }
  }
