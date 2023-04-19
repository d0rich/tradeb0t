import { globalStore } from '../global/store'
import { ExchangeAnalyzer, LoggerService, TradeBot, ExchangeTrader, ExchangeWatcher, AuthService, ApiService } from 'src/bot'

export function HandleError() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    // Check of the decorated property is a function
    if (typeof descriptor.value !== 'function') {
      throw new Error(
        'HandleError decorator is applicable only to functions. ' +
          `Please remove it from '${propertyKey}' in ${target}`
      )
    }
    // The function that we are going to wrap
    const declaredFn = descriptor.value
    // Provide a new function for this property that wraps the original function
    descriptor.value = function (...args: unknown[]) {
      const logger = extractLogger(this)
      console.log('logger', logger)
      // Call the method with `this` set the object with the method,
      // in case that matters.
      let result: unknown
      try {
        result = declaredFn.apply(this, args)
      } catch (e) {
        logError(e as Error, logger)
      }

      // Do the thing you want with the result

      if (result instanceof Promise) {
        result.catch((e) => logError(e, logger))
      }

      // Return the result from the origin function
      return result

      function logError(e: Error, logger?: LoggerService) {
        if (logger) {
          logger.log({
            type: 'error',
            message: `Error occurred in ${propertyKey}`,
            attachment: e
          })
        } else {
          console.error(`Error occurred in ${propertyKey}`, e)
        }
      }

      function extractLogger(context: PropertyDescriptor) {
        console.log(context)
        console.log(context instanceof TradeBot)
        // @ts-ignore
        console.log(context?.logger)
        // Try to access logger
        if (context instanceof LoggerService) {
          return context
        }
        if (context instanceof TradeBot) {
          return context.logger
        }
        if (context instanceof ExchangeAnalyzer) {
          return context.tradebot.logger
        }
        if (context instanceof ExchangeTrader) {
          // @ts-ignore
          return context.tradebot.logger
        }
        if (context instanceof ExchangeWatcher) {
          // @ts-ignore
          return context.tradebot.logger
        }
        if (context instanceof AuthService) {
          // TODO: Add logger to AuthService
          return
        }
        if (context instanceof ApiService) {
          // @ts-ignore
          return context.tradeBot.logger
        }
        return
      }
    }
  }
}
