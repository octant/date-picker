/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import Calendar from './'

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

  test('the selected item is set when a Item is clicked', () => {
    const date = new Date()
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    const calendar = mount(
      <Calendar />
    )

    calendar.find({id: dateString}).first().simulate('click')

    expect(calendar.state().selected).toEqual(dateString)
  })
})
