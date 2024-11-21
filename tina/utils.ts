export const getNextDay = (day: number) => {
  const today = new Date()
  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + ((day + 7 - (today.getDay() - 1)) % 7))
  return nextDay.toISOString()
}
