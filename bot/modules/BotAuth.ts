import { Request } from "express"
import { IncomingMessage } from "http"
import { config } from "../../config"

export class BotAuth{
  private readonly _botToken: string

  constructor(botToken: string){
    this._botToken = botToken
  }

  public authByToken(token: string): boolean {
    if (!config.auth.required) return true
    return this._botToken === token
  }

  public authByRequest(request: Request | IncomingMessage): boolean {
    const token = request.headers.authorization?.replace('Bearer ', '')
    return this.authByToken(token || '')
  }
}