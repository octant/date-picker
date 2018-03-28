/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import sinon from 'sinon'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import Month from './'

Enzyme.configure({adapter: new Adaptor()})
expect.addSnapshotSerializer(serializer)

describe('<Month /> appearance', () => {
  test('displays the same', () => {
    const component = renderer.create(
      <Month currentDate={new Date(2018, 5, 1)} startDate={new Date(2018, 4, 27)} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('<Month /> functionality', () => {
  test('displays a Grid', () => {
    const month = mount(<Month currentDate={new Date(2018, 2, 20)} startDate={new Date(2018, 1, 25)} />)

    expect(month.find('Grid').length).toBe(1)
  })

  test('displays correct dates', () => {
    const month = mount(<Month currentDate={new Date(2018, 3, 20)} startDate={new Date(2018, 3, 1)} />)

    expect(month.find('Item').first().text()).toBe('Su')
    expect(month.find('Item').last().text()).toBe('12')
    expect(month.find('Item').length).toBe(49)
  })

  test('sets an "id" property on each item', () => {
    const month = mount(<Month currentDate={new Date(2018, 2, 25)} startDate={new Date(2018, 1, 28)} />)

    expect(month.find({id: '2018-03-22'}).length).toBe(1)
  })

  test('all instances of day Items are clickable', () => {
    const clickMethod = sinon.spy()
    const month = mount(
      <Month currentDate={new Date(2018, 2, 25)} clickMethod={clickMethod} startDate={new Date(2018, 2, 1)} />
    )

    month.find('Item').forEach((item) => {
      item.simulate('click')
    })

    expect(clickMethod.callCount).toBe(42)
  })
})
