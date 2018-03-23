/* eslint-env jest */

import React from 'react'
import Calendar from './'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adaptor()})
expect.addSnapshotSerializer(serializer)

describe('<Calendar />', () => {
  test('displays the same', () => {
    const component = renderer.create(
      <Calendar />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  xtest('calls the clickMethod when clicked', () => {
    const calendar = mount(
      <Calendar />
    )

    calendar.simulate('click')

    // expect().toEqual()
  })
})
