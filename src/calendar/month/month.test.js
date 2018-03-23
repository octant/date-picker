/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import sinon from 'sinon'
import Enzyme, {mount} from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import Month from './'

Enzyme.configure({adapter: new Adaptor()})
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

describe('<Month /> functionality', () => {
  test('has list of days')
})
