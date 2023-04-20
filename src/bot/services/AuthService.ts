import { IncomingHttpHeaders } from 'http'
import { ITradeBot } from '../ITradeBot'

interface IHttpHeadersCarrier {
  headers: IncomingHttpHeaders
}
export class AuthService {
  constructor(private readonly tradebot: ITradeBot) {}

  authByToken(token = ''): boolean {
    if (!this.tradebot.config.auth.required) return true
    return this.tradebot.config.auth.token === token
  }

  authByRequest(request: IHttpHeadersCarrier): boolean {
    const token = request.headers.authorization?.replace('Bearer ', '')
    return this.authByToken(token || '')
  }
}
