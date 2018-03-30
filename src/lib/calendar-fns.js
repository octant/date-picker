export const currentDecade = (decade) => {
  return (decade - 2) + ((decade % 20) / 5)
}

export const nextDecade = (decade) => {
  return (decade + 10) - (0.2 * (decade % 20))
}

export const previousDecade = (decade) => {
  return (decade - 14) + (0.2 * (decade % 20))
}

const previousYear = (year) => {
  return new Date(year - 1, 0 - 4, 1)
}

const nextYear = (year) => {
  return new Date(year + 1, 0, 1)
}

const previousMonth = (year, month, offset) => {
  const firstDayIndex = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const previousMonthFill = (firstDayIndex - 1 + 7) % 7
  const shift = previousMonthFill + daysInMonth - offset

  if (new Date(year, month, 0 - shift) >= new Date(year, month - 1, 1)) {
    return new Date(year, month, 0 - shift - 7)
  } else {
    return new Date(year, month, 0 - shift)
  }
}

const nextMonth = (year, month, offset) => {
  const firstDayIndex = new Date(year, month + 1, 1).getDay()
  const previousMonthFill = (0 - 7) % 7
  const shift = firstDayIndex + previousMonthFill - offset

  if (new Date(year, month + 1, 1 - shift) > new Date(year, month + 1, 1)) {
    return new Date(year, month + 1, 1 - shift - 7)
  } else {
    return new Date(year, month + 1, 1 - shift)
  }
}

export const buildCalendar = (startDate) => {
  const days = []
  for (let offset = 0; offset < 42; offset++) {
    days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + offset))
  }

  return [...days]
}

export const buildYear = (startDate) => {
  const months = []
  for (let i = 0; i < 16; i++) {
    months.push(new Date(startDate.getFullYear(), startDate.getMonth() + i, 1))
  }

  return [...months]
}

export const weekdays = (offset = 0) => {
  const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  return [...week.slice(offset), ...week.slice(0, offset)]
}

export const getPreviousYear = (date) => {
  return previousYear(date.getFullYear())
}

export const getNextYear = (date) => {
  return nextYear(date.getFullYear())
}

export const getCurrentYear = (date) => {
  return nextYear(date.getFullYear() - 1)
}

export const getPreviousMonth = (date, offset = 0) => {
  return previousMonth(date.getFullYear(), date.getMonth(), offset)
}

export const getCurrentMonth = (date, offset = 0) => {
  return nextMonth(date.getFullYear(), date.getMonth() - 1, offset)
}

export const getNextMonth = (date, offset = 0) => {
  return nextMonth(date.getFullYear(), date.getMonth(), offset)
}

export const getCurrentDecade = (date) => {
  const year = date.getFullYear()
  const decade = year - year % 10
  return currentDecade(decade)
}

export const getNextDecade = (date) => {
  const year = date.getFullYear()
  const decade = year - year % 10
  return nextDecade(decade)
}

export const getPreviousDecade = (date) => {
  const year = date.getFullYear()
  const decade = year - year % 10
  return previousDecade(decade)
}
