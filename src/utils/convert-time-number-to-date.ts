export function convertTimeNumberToDate(timeNumber: number) {
  const hours = ~~(timeNumber / 60)
  const minutes = timeNumber % 60

  return { hours, minutes }
}
