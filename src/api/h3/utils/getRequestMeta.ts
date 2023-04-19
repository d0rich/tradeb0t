import { H3Event, getQuery, readBody, getMethod } from 'h3'

export async function getRequestMeta(event: H3Event) {
  return {
    remote: event.node.req.socket.remoteAddress,
    params: getQuery(event),
    body: getMethod(event) === 'POST' ? await readBody(event) : undefined
  }
}
