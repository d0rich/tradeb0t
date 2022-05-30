import {OperationType, OrderDetails} from "../../utils/orderDetails";
import {Job} from "node-schedule";

export interface IExchangeTrader{
    sendOrder({ ticker, lots, price }: OrderDetails, operation: OperationType): any
    scheduleOrder(order: OrderDetails, date: Date): Job
    scheduleAction(action: Function, date: Date): Job
}
