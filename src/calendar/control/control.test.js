/* eslint-env jest */

import React from 'react'
import sinon from 'sinon'
import Enzyme, {shallow} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import WithControl from './'

Enzyme.configure({adapter: new Adaptor()})

describe('WithControl functionality', () => {
  class TestComponent extends React.Component {
    render () {
      return (
        <button>click me</button>
      )
    }
  }

  test('returns a wrapped component', () => {
    const ControlledComponent = WithControl(TestComponent)
    const control = shallow(<ControlledComponent clickMethod={jest.fn()} />)

    expect(control.name()).toEqual('TestComponent')
    expect(control.dive('button').length).toBe(1)
  })

  test('wrapped component has a click handler', () => {
    const clickMethod = sinon.spy()
    const ControlledComponent = WithControl(TestComponent)
    const control = shallow(<ControlledComponent clickMethod={clickMethod} />)

    control.find('TestComponent').simulate('click')

    expect(clickMethod.callCount).toBe(1)
  })
})
