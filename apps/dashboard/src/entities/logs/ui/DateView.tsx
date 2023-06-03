import { getTimeString } from "@/src/shared/utils/date"

export interface DateViewProps {
  date: Date | string | number
}

export default function DateView({ date }: DateViewProps) {
  const dateObject = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  return <span className="text-warning">{getTimeString(dateObject)}</span>
}
