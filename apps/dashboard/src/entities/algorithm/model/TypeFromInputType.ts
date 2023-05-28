import type { CreateOrderOptions } from '@tradeb0t/core'
import { EInputType } from '@tradeb0t/core/dist/enums'

export type TypeFromInputType<T extends `${EInputType}`> = T extends EInputType.NUMBER
  ? number
  : T extends `${EInputType.NUMBER}`
  ? number
  : T extends EInputType.STRING
  ? string
  : T extends `${EInputType.STRING}`
  ? string
  : T extends EInputType.DATE
  ? Date
  : T extends `${EInputType.DATE}`
  ? Date
  : T extends EInputType.ORDER_DETAILS
  ? CreateOrderOptions
  : T extends `${EInputType.ORDER_DETAILS}`
  ? CreateOrderOptions
  : never
