import { ITypedTransformer } from './ITypedTransformer'

export const onlyPositiveNumbersTransformer: ITypedTransformer<number, number> = {
  to: (value: number | undefined) => {
    if (!value || value < 0) {
      throw new Error('Value must be positive')
    }
    return value
  },
  from: (value: number) => value
} as const
