import { EventEmitter } from 'events'

// create a global event emitter (could be replaced by redis, etc)
export const eventEmitter = new EventEmitter()

eventEmitter.on('log:all', (data) => {
  console.log('log:all', data)
})
