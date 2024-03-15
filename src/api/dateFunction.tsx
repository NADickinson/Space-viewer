export const yearsForDropDown = () => {
  const currentDate = new Date()
  const ArrayOfYears = []
  for (let i = 1995; i <= currentDate.getFullYear(); i++) {
    ArrayOfYears.push(i)
  }
  return ArrayOfYears
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthsForDropDown = (currentYear: number) => {
  const currentDate = new Date()
  if (currentYear === 1995) {
    return [5, 6, 7, 8, 9, 10, 11]
  } else if (currentYear !== currentDate.getFullYear()) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  } else {
    const currentYearArray = []
    const currentMonth = currentDate.getMonth()
    while (currentYearArray.length <= currentMonth) {
      currentYearArray.push(currentYearArray.length)
    }
    return currentYearArray
  }
}
