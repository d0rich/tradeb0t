export enum EInputType {
  STRING = 'string',
  NUMBER = 'number',
  ORDER_DETAILS = 'OrderDetails',
  DATE = 'Date'
}

export type InputTypes = Record<string, EInputType | `${EInputType}`>
