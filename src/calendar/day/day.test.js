/* eslint-env jest */

import React from 'react'
import Day from './'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adaptor()})
expect.addSnapshotSerializer(serializer)

describe('<Day />', () => {
  test('renders the same each time', () => {
    const component = renderer.create(
      <Day date={new Date(2018, 2, 23)} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('displays proper date', () => {
    const day = mount(<Day date={new Date(2018, 2, 2)} />)
    expect(day.text()).toEqual('2')
  })

  test('calls the clickMethod when clicked', () => {
    const clickMethod = jest.fn()
    const day = mount(
      <Day
        date={new Date(2018, 2, 2)}
        clickMethod={clickMethod} />
    )
    day.simulate('click')

    expect(clickMethod.mock.calls.length).toBe(1)
  })

  test('sets an id in state', () => {
    const day = mount(
      <Day date={new Date(2018, 2, 2)} />
    )

    expect(day.state().id).toEqual('2018-03-02')
  })
})
