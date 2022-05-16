import {D_PortfolioPosition, D_Currency, D_Security, D_FollowedSecurity, D_Operation} from "@prisma/client";

export interface IExchangeWatcher{
    receiveOrderData(data: any): any
    getRate(ticker: string): any
    getPortfolio(): Promise<D_PortfolioPosition[]>
}
