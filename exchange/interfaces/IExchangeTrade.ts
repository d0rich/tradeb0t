export interface IExchangeTrade {
  sell(): Promise<any>
  buy(): Promise<any>
  sellOrCancel(): Promise<any>
  buyOrCancel(): Promise<any>
}