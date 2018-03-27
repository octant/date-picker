export const replace = (regex, datePart) => {
  return (formatString) => {
    const match = formatString.match(regex)
    return match ? formatString.replace(regex, `${datePart}`.slice(-match[0].length)) : formatString
  }
}

export const format = (date, formatString) => {
  const replaceYear = replace(new RegExp('Y{2,4}'), date.getFullYear())
  const replaceMonth = replace(new RegExp('M{1,2}'), ('0' + (date.getMonth() + 1)).slice(-2))
  const replaceDay = replace(new RegExp('D{1,2}'), ('0' + date.getDate()).slice(-2))

  return replaceYear(replaceMonth(replaceDay(formatString)))
}

export const partialToFullDate = (y, m = 1, d = 1) => {
  return new Date(y, m - 1, d)
}

export const stringToDate = (dateString) => {
  return partialToFullDate(...dateString.split('-'))
}
