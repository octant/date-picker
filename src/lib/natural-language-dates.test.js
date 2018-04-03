/* eslint-env jest */
import {
  SECONDS_IN_DAY,
  parse
} from './natural-language-dates'

describe('Parse sentence for time', () => {
  test('replace year', () => {
    const sentence = '5 days ago'
    const date = new Date(2018, 2, 22)

    expect(parse(sentence)).toEqual(date.setSeconds(date.getSeconds() + (-5 * SECONDS_IN_DAY)))
  })
})
