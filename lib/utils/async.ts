export function awaitTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve(true)}, ms)
  })
}