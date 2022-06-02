import {C_Currency, C_Security, C_Operation, C_Order, C_Portfolio} from "../../src/exchangeClientTypes";
import {D_Currency, D_PortfolioPosition, D_Security, D_Operation, D_Order} from "@prisma/client";
import {OrderStatus} from "./orderDetails";
import {OperationType} from "./database";

export interface ITranslatorsCD {
    currency(currency: C_Currency): Promise<D_Currency>,
    portfolio(portfolio: C_Portfolio): Promise<D_PortfolioPosition[]>
    security(security: C_Security): Promise<D_Security>
    operation(operation: C_Operation): Promise<D_Operation>
    operations(operations: C_Operation[]): Promise<D_Operation[]>
    order(order: C_Order): Promise<D_Order>
    orderStatus(order: C_Order): OrderStatus
    orderOperation(order: C_Order): OperationType
}
