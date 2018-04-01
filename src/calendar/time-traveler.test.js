/* eslint-env jest */

import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import Calendar from './time-traveler'
import { format } from '../lib/date-fns'
import { getCurrentMonth } from '../lib/calendar-fns'

Enzyme.configure({adapter: new Adaptor()})

describe('<Calendar /> functionality', () => {
  test('defaults to current month if a "selected" prop is not passed', () => {
    const today = new Date()
    const calendar = mount(
      <Calendar>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const {mode, startOfMonth, startOfCalendar} = calendar.instance().state

    expect(mode).toEqual('month')
    expect(startOfMonth).toEqual(new Date(today.getFullYear(), today.getMonth(), 1))
    expect(startOfCalendar).toEqual(getCurrentMonth(today))
  })

  test('uses selected date if "selected" prop is passed', () => {
    const selected = new Date(2018, 6, 4)
    const calendar = mount(
      <Calendar selected={format(selected, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const {mode, startOfMonth, startOfCalendar} = calendar.instance().state

    expect(mode).toEqual('month')
    expect(startOfMonth).toEqual(new Date(selected.getFullYear(), selected.getMonth(), 1))
    expect(startOfCalendar).toEqual(getCurrentMonth(selected))
  })

  test('set mode with prop', () => {
    const selected = new Date(2018, 6, 4)
    const calendar = mount(
      <Calendar mode='year' selected={format(selected, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const {mode} = calendar.instance().state

    expect(mode).toEqual('year')
  })

  test('change modes', () => {
    const selected = new Date(2018, 6, 4)
    const calendar = mount(
      <Calendar selected={format(selected, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )

    const modeBefore = calendar.instance().state.mode
    calendar.instance().selectMode('year')
    const modeAfter = calendar.instance().state.mode

    expect(modeBefore).toEqual('month')
    expect(modeAfter).toEqual('year')
  })

  test('handles start of calendar based on modes', () => {
    const date = new Date(2003, 9, 31)
    const startOfMonth = new Date(2003, 8, 28)
    const startOfYear = new Date(2003, 0, 1)
    const startOfDecade = new Date(1998, 0, 1)

    const calendarInMonthMode = mount(
      <Calendar mode='month' selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const calendarInYearMode = mount(
      <Calendar mode='year' selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const calendarInDecadeMode = mount(
      <Calendar mode='decade' selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )

    expect(calendarInMonthMode.instance().state.startOfCalendar).toEqual(startOfMonth)
    expect(calendarInYearMode.instance().state.startOfCalendar).toEqual(startOfYear)
    expect(calendarInDecadeMode.instance().state.startOfCalendar).toEqual(startOfDecade)
  })

  test('handles start of month based on modes', () => {
    const date = new Date(2018, 2, 12)
    const startOfMonth = new Date(2018, 2, 1)
    const startOfYear = new Date(2018, 0, 1)
    const startOfDecade = new Date(2010, 0, 1)

    const calendarInMonthMode = mount(
      <Calendar mode='month' selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const calendarInYearMode = mount(
      <Calendar mode='year' selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )
    const calendarInDecadeMode = mount(
      <Calendar mode='decade' selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )

    expect(calendarInMonthMode.instance().state.startOfMonth).toEqual(startOfMonth)
    expect(calendarInYearMode.instance().state.startOfMonth).toEqual(startOfYear)
    expect(calendarInDecadeMode.instance().state.startOfMonth).toEqual(startOfDecade)
  })

  test('handles time travel between months', () => {
    const date = new Date(2018, 1, 26)

    const calendar = mount(
      <Calendar selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )

    calendar.instance().timeTravelTo('previous', 'month')

    expect(calendar.instance().state.startOfMonth).toEqual(new Date(2018, 0, 1))
    expect(calendar.instance().state.startOfCalendar).toEqual(new Date(2017, 11, 31))

    calendar.instance().timeTravelTo('next', 'month')

    expect(calendar.instance().state.startOfMonth).toEqual(new Date(2018, 1, 1))
    expect(calendar.instance().state.startOfCalendar).toEqual(new Date(2018, 0, 28))
  })

  test('handles time travel between years', () => {
    const date = new Date(2018, 1, 26)

    const calendar = mount(
      <Calendar selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )

    calendar.instance().timeTravelTo('previous', 'year')

    expect(calendar.instance().state.startOfMonth).toEqual(new Date(2017, 0, 1))
    expect(calendar.instance().state.startOfCalendar).toEqual(new Date(2016, 8, 1))

    calendar.instance().timeTravelTo('next', 'year')

    expect(calendar.instance().state.startOfMonth).toEqual(new Date(2018, 0, 1))
    expect(calendar.instance().state.startOfCalendar).toEqual(new Date(2018, 0, 1))
  })

  test('handles time travel between decades', () => {
    const date = new Date(2018, 1, 26)

    const calendar = mount(
      <Calendar selected={format(date, 'YYYY-MM-DD')}>
        {calendar => (<div>{calendar.mode}</div>)}
      </Calendar>
    )

    calendar.instance().timeTravelTo('previous', 'decade')

    expect(calendar.instance().state.startOfMonth).toEqual(new Date(2000, 0, 1))
    expect(calendar.instance().state.startOfCalendar).toEqual(new Date(1998, 0, 1))

    calendar.instance().timeTravelTo('next', 'decade')

    expect(calendar.instance().state.startOfMonth).toEqual(new Date(2010, 0, 1))
    expect(calendar.instance().state.startOfCalendar).toEqual(new Date(2010, 0, 1))
  })
})
