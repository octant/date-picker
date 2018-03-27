/* eslint-env jest */

import {
  format,
  replace
} from './date-fns'

describe('replace', () => {
  test('replace year', () => {
    const date = new Date(2018, 2, 26)
    const replaceYear = replace(new RegExp('Y{2,4}'), date.getFullYear())

    expect(replaceYear('YY')).toEqual('18')
    expect(replaceYear('YYYY')).toEqual('2018')
  })

  test('replace month', () => {
    const date = new Date(2018, 2, 2)
    const replaceMonth = replace(new RegExp('M{1,2}'), ('0' + (date.getMonth() + 1)).slice(-2))

    expect(replaceMonth('M')).toEqual('3')
    expect(replaceMonth('MM')).toEqual('03')
  })

  test('replace day', () => {
    const date = new Date(2018, 2, 2)
    const replaceDay = replace(new RegExp('D{1,2}'), ('0' + date.getDate()).slice(-2))

    expect(replaceDay('D')).toEqual('2')
    expect(replaceDay('DD')).toEqual('02')
  })
})

describe('format', () => {
  test('returns a string with dates substituted', () => {
    const date = new Date(2018, 2, 9)

    expect(format(date, 'YY')).toEqual('18')
    expect(format(date, 'YYYY')).toEqual('2018')
    expect(format(date, 'YYYY-MM')).toEqual('2018-03')
    expect(format(date, 'M/D/YY')).toEqual('3/9/18')
  })
})
