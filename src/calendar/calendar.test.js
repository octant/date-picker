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
      <Calendar selected='2019-06-04' />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('<Calendar /> functionality', () => {
  test('sets an "id" property on each day', () => {
    const calendar = mount(<Calendar />)

    expect(calendar.find({id: '2018-03-22'}).length).toBe(1)
  })

  test('defaults to current month if a "selected" prop is not passed', () => {
    const date = new Date()
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    const calendar = mount(<Calendar />)

    expect(calendar.find({id: dateString}).length).toBe(1)
  })

  test('loads correct dates when passed a selected date', () => {
    const date = new Date(2017, 11, 25)
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`

    const calendar = mount(<Calendar selected={dateString} />)

    expect(calendar.find({id: dateString}).length).toBe(1)
  })

  test('loads the next month when next is clicked', () => {
    const calendar = mount(<Calendar selected='2018-03-22' />)

    calendar.find('button').last().simulate('click')
    calendar.find('button').last().simulate('click')

    expect(calendar.state().calendar[0].getDate()).toEqual(29)
  })

  test('loads the previous month when previous is clicked', () => {
    const calendar = mount(<Calendar selected='2018-05-22' />)

    calendar.find('button').first().simulate('click')
    calendar.find('button').first().simulate('click')

    expect(calendar.state().calendar[0].getDate()).toEqual(25)
  })

  test('the selected day is set when a Day is clicked', () => {
    const date = new Date()
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    const calendar = mount(
      <Calendar />
    )

    calendar.find({id: dateString}).first().simulate('click')

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
})
