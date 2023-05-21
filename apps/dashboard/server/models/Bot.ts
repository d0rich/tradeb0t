export type BotInitOptions = {
  name: string
  host: string
  port: number
  token?: string
}

export class Bot {
  readonly host: string
  readonly port: number
  readonly token?: string

  name: string
  status: 'Disconnected' | 'Active' | 'Not Authorized' = 'Disconnected'

  constructor({ name, host, port, token }: BotInitOptions){
    this.name = name
    this.host = host
    this.port = port
    this.token = token
  }

  get url(){
    return `http://${this.host}:${this.port}`
  }

  get authHeader(){
    return { Authorization: `Bearer ${this.token}` }
  }

  toExport(): BotInitOptions{
    return {
      name: this.name,
      host: this.host,
      port: this.port,
      token: this.token
    }
  }
}
