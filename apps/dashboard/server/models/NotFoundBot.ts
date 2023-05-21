import { Bot } from "./Bot";

export class NotFoundBot extends Bot {
  constructor(){
    super({name: '[System] Not Found', host: '', port: 0, token: ''})
  }
}
