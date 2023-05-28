/**
 * @see {@link https://support.tradeplusonline.com/support/solutions/articles/1000254592-what-are-the-different-order-status-possible-of-an-order- | What are the different order status possible of an order?}
 */
export enum EOrderStatus {
  NOT_PROCESSED = 'not_processed',
  TO_BE_PROCESSED = 'to_be_processed',
  PLACED = 'placed',
  UNITS_ALLOCATED = 'units_allocated',
  UNITS_REDEEMED = 'units_redeemed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  UNDEFINED = 'undefined'
}

/**
 * @see {@link EOrderStatus}
 */
export type OrderStatus = EOrderStatus | `${EOrderStatus}`
