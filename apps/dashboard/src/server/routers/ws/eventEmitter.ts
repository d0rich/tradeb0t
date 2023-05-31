import { EventEmitter } from 'events'

// create a global event emitter (could be replaced by redis, etc)
export const eventEmitter = new EventEmitter()
