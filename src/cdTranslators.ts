import {ExchangeWatcher} from "../lib/modules";
import {C_Currency, C_Instrument, C_Operation, C_Order, C_Portfolio} from "./exchangeClientTypes";
import {D_Currency, D_Instrument, D_Operation, D_PortfolioPosition} from "@prisma/client";
import {ExchangeClient} from "./ExchangeClient/ExchangeClient";
import {ITranslatorsCD} from "../lib/utils";

const instrumentsCache = new Map<string, C_Instrument>()

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
            const exchangeInstrId = operation?.figi || ''
            if (!instrumentsCache.has(exchangeInstrId)) instrumentsCache.set(exchangeInstrId, await exchangeClient.infoModule.getInstrumentByExchangeId(exchangeInstrId))
            // @ts-ignore
            const instrument: C_Instrument = instrumentsCache.get(exchangeInstrId)
            return {
                instrument_ticker: instrument.ticker,
                amount: operation?.quantity || 0,
                created_at: new Date(operation.date),
                exchange_id: operation.id,
                operation_type: operation.operationType === "Buy" ? 'buy' : 'sell',
                price: operation?.price || 0,
                status: operation.status,
                updated_at: new Date(),
                run_id: null
            }
        },
        async operations(operations: C_Operation[]): Promise<D_Operation[]> {
            const instrumentIds = Array.from(new Set(operations.map(op => op.figi)))
            await Promise.all(instrumentIds.map(async (id = '') => {
                if (!instrumentsCache.has(id)) instrumentsCache.set(id, await exchangeClient.infoModule.getInstrumentByExchangeId(id))
            }))
            return await Promise.all(operations.map(op => this.operation(op)))
        }
    }
}
