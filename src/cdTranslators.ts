import {ExchangeWatcher} from "../lib/modules";
import {C_Currency, C_Instrument, C_Operation, C_Order, C_Portfolio} from "./exchangeClientTypes";
import {D_Currency, D_Instrument, D_Operation, D_Order, D_PortfolioPosition} from "@prisma/client";
import {ExchangeClient} from "./ExchangeClient/ExchangeClient";
import {ITranslatorsCD} from "../lib/utils";


export function initTranslators(watcher: ExchangeWatcher, exchangeClient: ExchangeClient): ITranslatorsCD {
    return {
        async currency(currency: C_Currency): Promise<D_Currency> {
            return { name: currency, ticker: currency }
        },
        async portfolio(portfolio: C_Portfolio): Promise<D_PortfolioPosition[]> {
            return portfolio.positions
                .map(position => {
                    return {
                        instrument_ticker: position.ticker || 'undefined',
                        amount: position.balance
                    }
                })
        },
        async instrument(instrument: C_Instrument): Promise<D_Instrument> {
            if (!instrument.currency) throw new Error(`Instrument with ticker "${instrument.ticker}" have no currency`)
            return {
                currency_ticker: instrument.currency,
                name: instrument.name,
                price: await watcher.getInstrumentLastPrice(instrument.ticker),
                ticker: instrument.ticker
            }
        },
        async operation(operation: C_Operation): Promise<D_Operation> {
            const instrument = operation?.figi ?
                await exchangeClient.infoModule.getInstrumentByExchangeId(operation?.figi) :
                null
            return {
                instrument_ticker: instrument?.ticker || null,
                amount: operation?.quantityExecuted || null,
                amount_requested: operation?.quantity || null,
                created_at: new Date(operation.date),
                exchange_id: operation.id,
                operation_type: operation.operationType === "Buy" ? 'buy' : 'sell',
                price: operation?.price || 0,
                status: operation.status,
                updated_at: new Date(),
            }
        },
        async operations(operations: C_Operation[]): Promise<D_Operation[]> {
            const instrumentIds = Array.from(new Set(operations.map(op => op.figi)))
            await Promise.all(instrumentIds.map(async (id) => {
                if (id)
                    await exchangeClient.infoModule.getInstrumentByExchangeId(id)
            }))
            return await Promise.all(operations.map(op => this.operation(op)))
        },
        async order(order: C_Order): Promise<D_Order> {
            const instrument = await exchangeClient.infoModule.getInstrumentByExchangeId(order.figi)
            return {
                operation_type: order.operation === "Buy" ? 'buy' : 'sell',
                run_id: null,
                status_first: order.status,
                exchange_id: order.orderId,
                created_at: new Date(),
                amount: order.requestedLots,
                price: order.price,
                instrument_ticker: instrument?.ticker || 'undefined'

            }
        }
    }
}
