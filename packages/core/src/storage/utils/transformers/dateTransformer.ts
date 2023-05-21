import { ITypedTransformer } from './ITypedTransformer'

export const dateTransformer: ITypedTransformer<Date, number> = {
  to: (value: Date | undefined) => (value ? Number(value) : Number(new Date())),
  from: (value: number) => new Date(value)
} as const
