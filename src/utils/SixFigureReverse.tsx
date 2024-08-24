export const sixFigureReverse = (sixFigureDate: string) => {
  const yearPart = sixFigureDate.slice(0, 2)
  const month = sixFigureDate.slice(2, 4)
  const day = sixFigureDate.slice(4, 6)
  const century = parseInt(yearPart, 10) >= 95 ? '19' : '20'
  const year = century + yearPart.padStart(2, '0')
  return day + '/' + month + '/' + year
}
