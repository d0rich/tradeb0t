import { Request } from "express"
import { IncomingMessage } from "http"

export class BotAuth{
  private readonly _botToken: string

  constructor(botToken: string){
    this._botToken = botToken
  }

  public authByToken(token: string): boolean {
    return this._botToken === token
  }

  public authByRequest(request: Request | IncomingMessage): boolean {
    const token = request.headers.authorization?.replace('Bearer ', '')
    return this.authByToken(token || '')
  }
}