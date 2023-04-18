import { H3Event, getQuery, readBody } from 'h3'

export function getRequestMeta(event: H3Event) {
  return {
    remote: event.node.req.socket.remoteAddress,
    params: getQuery(event),
    body: readBody(event)
  }
}
