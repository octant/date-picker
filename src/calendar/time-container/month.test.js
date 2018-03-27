/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'

import Month from './'

expect.addSnapshotSerializer(serializer)

describe('<Month /> appearance', () => {
  test('displays the same', () => {
    const component = renderer.create(
      <Month selected='2019-07-07' />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
