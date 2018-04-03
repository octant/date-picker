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
  test('has a TimeMachine', () => {
    const calendar = mount(<Calendar />)

    expect(calendar.find('TimeMachine').length).toBe(1)
  })

  test('has a TimeSpan', () => {
    const calendar = mount(<Calendar />)

    expect(calendar.find('TimeSpan').length).toBe(1)
  })
})
