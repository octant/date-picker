/* eslint-env jest */

import React from 'react'
import Calendar from './'
import renderer from 'react-test-renderer'

test('Calendar displays the same', () => {
  const component = renderer.create(
    <Calendar />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
