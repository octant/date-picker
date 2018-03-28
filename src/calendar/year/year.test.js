/* eslint-env jest */

import React from 'react'
import sinon from 'sinon'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import Year from './'

Enzyme.configure({adapter: new Adaptor()})

describe('<Year /> functionality', () => {
  test('displays a Grid', () => {
    const year = mount(<Year currentDate={new Date(2018, 2, 20)} startDate={new Date(2018, 1, 25)} />)

    expect(year.find('Grid').length).toBe(1)
  })

  test('displays correct months', () => {
    const year = mount(<Year currentDate={new Date(2018, 2, 20)} startDate={new Date(2018, 0, 1)} />)

    expect(year.find('Item').first().text()).toBe('Jan')
    expect(year.find('Item').last().text()).toBe('Apr')
    expect(year.find('Item').length).toBe(16)
  })

  test('sets an "id" property on each item', () => {
    const year = mount(<Year currentDate={new Date(2018, 2, 20)} startDate={new Date(2018, 1, 25)} />)

    expect(year.find({id: '2018-03'}).length).toBe(1)
  })

  test('all instances of month Items are clickable', () => {
    const clickMethod = sinon.spy()
    const year = mount(
      <Year clickMethod={clickMethod} currentDate={new Date(2018, 2, 20)} startDate={new Date(2018, 0, 1)} />
    )

    year.find('Item').forEach((item) => {
      item.simulate('click')
    })

    expect(clickMethod.callCount).toBe(16)
  })
})
