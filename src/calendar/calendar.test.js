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
  test('defaults to current month if a "selected" prop is not passed')

  test('loads correct dates when passed a selected date')

  test('the selected item is set when a Item is clicked')
})
