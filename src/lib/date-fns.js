export const replace = (regex, datePart) => {
  return (formatString) => {
    const match = formatString.match(regex)
    return match ? formatString.replace(regex, `${datePart}`.slice(-match[0].length)) : formatString
  }
}

export const format = (date, formatString) => {
  const replaceYear = replace(/Y{2,4}/, date.getFullYear())
  const replaceMonth = replace(/M{1,2}/, ('0' + (date.getMonth() + 1)).slice(-2))
  const replaceDay = replace(/D{1,2}/, ('0' + date.getDate()).slice(-2))

  return replaceYear(replaceMonth(replaceDay(formatString)))
}

export const partialToFullDate = (y, m = 1, d = 1) => {
  return new Date(y, m - 1, d)
}

export const stringToDate = (dateString) => {
  return partialToFullDate(...dateString.split('-'))
}
