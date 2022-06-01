import {C_Currency, C_Instrument, C_Operation, C_Portfolio} from "../../src/exchangeClientTypes";
import {D_Currency, D_PortfolioPosition, D_Instrument, D_Operation} from "@prisma/client";

export interface ITranslatorsCD {
    currency(currency: C_Currency): Promise<D_Currency>,
    portfolio(portfolio: C_Portfolio): Promise<D_PortfolioPosition[]>
    instrument(instrument: C_Instrument): Promise<D_Instrument>
    operation(operation: C_Operation): Promise<D_Operation>
    operations(operations: C_Operation[]): Promise<D_Operation[]>
}
