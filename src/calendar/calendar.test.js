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
  test('calls the clickMethod when a Day is clicked', () => {
    sinon.spy(Calendar.prototype, '_handleClick')
    const calendar = mount(
      <Calendar />
    )

    calendar.find(Day).first().simulate('click')

    expect(Calendar.prototype._handleClick.calledOnce).toBe(true)
    Calendar.prototype._handleClick.restore()
  })
})
