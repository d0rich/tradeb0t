export function addSecondsToDate(date: Date, seconds: number): Date{
  return new Date(date.getTime() + 1000 * seconds)
}

export function addMinutesToDate(date: Date, minutes: number): Date{
  return new Date(date.getTime() + 60_000 * minutes)
}

