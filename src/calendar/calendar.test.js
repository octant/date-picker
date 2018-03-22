/* eslint-env jest */

import React from 'react'
import Calendar from './'
import renderer from 'react-test-renderer'

test('Something', () => {
  const component = renderer.create(
    <Calendar />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
