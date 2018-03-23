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

export const getPreviousMonth = (date, offset = 0) => {
  return previous(date.getFullYear(), date.getMonth(), offset)
}

export const getNextMonth = (date, offset = 0) => {
  return next(date.getFullYear(), date.getMonth(), offset)
}
