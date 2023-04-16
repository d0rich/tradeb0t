import { ITypedTransformer } from './ITypedTransformer'

export const onlyPositiveNumbersTransformer: ITypedTransformer<number, number> = {
  to: (value: number) => {
    if (value < 0) {
      throw new Error('Value must be positive')
    }
    return value
  },
  from: (value: number) => value
} as const
