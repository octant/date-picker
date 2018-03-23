/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import sinon from 'sinon'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import Calendar from './'
import Day from './day'

Enzyme.configure({adapter: new Adaptor()})
expect.addSnapshotSerializer(serializer)

describe('<Calendar /> appearance', () => {
  test('displays the same', () => {
    const component = renderer.create(
      <Calendar />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('<Calendar /> functionality', () => {
  test('the selected day is set when a Day is clicked', () => {
    const date = new Date()
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-01`
    const calendar = mount(
      <Calendar />
    )

    calendar.find(Day).first().simulate('click')

    expect(calendar.state().selected).toEqual(dateString)
  })

  test('has 42 instances of Day', () => {
    const calendar = mount(<Calendar />)

    expect(calendar.find(Day).length).toBe(42)
  })

  test('calls the clickMethod when a Day is clicked', () => {
    sinon.spy(Calendar.prototype, '_handleClick')
    const calendar = mount(
      <Calendar />
    )

    calendar.find(Day).first().simulate('click')

    expect(Calendar.prototype._handleClick.callCount).toBe(1)
    Calendar.prototype._handleClick.restore()
  })

  test('all instances of Day are clickable', () => {
    sinon.spy(Calendar.prototype, '_handleClick')
    const calendar = mount(
      <Calendar />
    )

    calendar.find(Day).forEach((day) => {
      day.simulate('click')
    })

    expect(Calendar.prototype._handleClick.callCount).toBe(42)
    Calendar.prototype._handleClick.restore()
  })

  test('defaults to current month if a "selected" prop is not passed')
  test('loads correct dates when passed a selected date')
  test('loads the next month when next is clicked')
  test('loads the previous month when previous is clicked')
})
