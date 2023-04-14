export interface Currency {
  name: string
  ticker: string
  /**
   * Ticker used to buy and sell currency on exchange
   */
  exchangeTicker: string
}
