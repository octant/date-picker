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
      <Month startDate={new Date(2018, 5, 1)} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('<Month /> functionality', () => {
  test('displays a Grid', () => {
    const month = mount(<Month startDate={new Date(2018, 2, 25)} />)

    expect(month.find('Grid').length).toBe(1)
  })

  test('displays correct dates', () => {
    const month = mount(<Month startDate={new Date(2018, 3, 1)} />)

    expect(month.find('Item').last().text()).toBe('12')
  })

  test('sets an "id" property on each item')

  test('defaults to current month if a "selected" prop is not passed')

  test('loads the next month when next is clicked')

  test('loads the previous month when previous is clicked')

  test('the selected item is set when a Item is clicked')

  test('has 42 instances of Item')

  test('calls the clickMethod when a Item is clicked')

  test('all instances of Item are clickable')
})
