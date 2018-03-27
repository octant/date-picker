const previous = (year, month, offset) => {
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

const next = (year, month, offset) => {
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

export const weekdays = (offset = 0) => {
  const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  return [...week.slice(offset), ...week.slice(0, offset)]
}

const convertDate = (y, m = 1, d = 1) => {
  return new Date(y, m - 1, d)
}

export const normalizeDate = (dateString) => {
  return convertDate(...dateString.split('-'))
}

export const toDateString = (date) => {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
}

export const getPreviousMonth = (date, offset = 0) => {
  return previous(date.getFullYear(), date.getMonth(), offset)
}

export const getCurrentMonth = (date, offset = 0) => {
  return next(date.getFullYear(), date.getMonth() - 1, offset)
}

export const getNextMonth = (date, offset = 0) => {
  return next(date.getFullYear(), date.getMonth(), offset)
}
