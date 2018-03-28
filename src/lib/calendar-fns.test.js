/* eslint-env jest */

import {
  getNextMonth,
  getNextYear,
  getPreviousMonth,
  getPreviousYear,
  weekdays
} from './calendar-fns'

describe('getPreviousYear', () => {
  test('gets the first date to display for the previous year', () => {
    const date = new Date(2018, 2, 28)
    const firstDay = getPreviousYear(date)

    expect(firstDay.getDate()).toBe(1)
    expect(firstDay.getMonth()).toBe(8)
    expect(firstDay.getFullYear()).toBe(2017)
  })
})

describe('getNextYear', () => {
  test('gets the first date to display for the next year', () => {
    const date = new Date(2018, 2, 28)
    const firstDay = getNextYear(date)

    expect(firstDay.getDate()).toBe(1)
    expect(firstDay.getMonth()).toBe(0)
    expect(firstDay.getFullYear()).toBe(2019)
  })
})

describe('getPreviousMonth', () => {
  test('gets the first date to display for the previous month', () => {
    const date = new Date(2018, 4, 23)
    const firstDay = getPreviousMonth(date)

    expect(firstDay.getDate()).toBe(25)
    expect(firstDay.getMonth()).toBe(2)
  })

  test('gets the first date using offset when month begins on offset 1', () => {
    const date = new Date(2018, 1, 18)
    const firstDay = getPreviousMonth(date, 2)

    expect(firstDay.getDate()).toBe(26)
    expect(firstDay.getMonth()).toBe(11)
    expect(firstDay.getFullYear()).toBe(2017)
  })

  test('gets the first date to display for the previous month using an offset', () => {
    const date = new Date(2018, 3, 23)
    const firstDay = getPreviousMonth(date, 1)

    expect(firstDay.getDate()).toBe(26)
    expect(firstDay.getMonth()).toBe(1)
  })
})

describe('getNextMonth', () => {
  test('gets the first date to display for the next month', () => {
    const date = new Date(2018, 2, 23)
    const firstDay = getNextMonth(date)

    expect(firstDay.getDate()).toBe(1)
    expect(firstDay.getMonth()).toBe(3)
  })

  test('gets the first date using offset when month begins on offset 1', () => {
    const date = new Date(2017, 11, 18)
    const firstDay = getNextMonth(date, 2)

    expect(firstDay.getDate()).toBe(26)
    expect(firstDay.getMonth()).toBe(11)
    expect(firstDay.getFullYear()).toBe(2017)
  })

  test('gets the first date to display for the next month using an offset', () => {
    const date = new Date(2018, 3, 23)
    const firstDay = getNextMonth(date, 1)

    expect(firstDay.getDate()).toBe(30)
    expect(firstDay.getMonth()).toBe(3)
  })
})

describe('weekdays', () => {
  test('returns Su-Sa by default', () => {
    expect(weekdays().join(' ')).toEqual('Su Mo Tu We Th Fr Sa')
  })

  test('returns Mo-Su with an offset of 1', () => {
    expect(weekdays(1).join(' ')).toEqual('Mo Tu We Th Fr Sa Su')
  })
})
