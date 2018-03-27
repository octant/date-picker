/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'

import TimeContainer from './'

expect.addSnapshotSerializer(serializer)

describe('<TimeContainer /> appearance', () => {
  test('displays the same', () => {
    const component = renderer.create(
      <TimeContainer selected='2019-07-07' />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
