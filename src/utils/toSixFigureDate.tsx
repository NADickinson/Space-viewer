export const toSixFigureDate = (year: number, month: number, day: number) => {
  let yearModified = year
  let monthModified = month
  let dayModified = day
  if (month === 0) {
    monthModified = 12
    yearModified -= 1
  }
  return `${yearModified.toString().slice(-2).padStart(2, '0')}${monthModified.toString().padStart(2, '0')}${dayModified
    .toString()
    .padStart(2, '0')}`
}
