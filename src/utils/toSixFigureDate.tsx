export const toSixFigureDate = (year: number, month: number, day: number) => {
  return `${year.toString().slice(-2).padStart(2, '0')}${month.toString().padStart(2, '0')}${day
    .toString()
    .padStart(2, '0')}`
}
