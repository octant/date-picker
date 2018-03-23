/* eslint-env jest */

import React from 'react'
import Day from './'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adaptor()})
expect.addSnapshotSerializer(serializer)

test('Day renders the same', () => {
  const component = renderer.create(
    <Day date={new Date()} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Day displays proper date', () => {
  const day = mount(<Day date={new Date(2018, 2, 2)} />)

  expect(day.text()).toEqual('2')
})
