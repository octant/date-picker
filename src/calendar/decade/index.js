import React from 'react'
import PropTypes from 'prop-types'

import Grid from '../grid'
import Item from '../item'
import { format } from '../../lib/date-fns'
import { buildDecade } from '../../lib/calendar-fns'

class Decade extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
    this._handleNextClick = this._handleNextClick.bind(this)
    this._handlePreviousClick = this._handlePreviousClick.bind(this)
  }

  _handleClick (props) {
    this.props.clickMethod({...props, mode: 'year'})
  }

  _handleNextClick () {
    this.props.travelTo('next', 'decade')
  }

  _handlePreviousClick () {
    this.props.travelTo('previous', 'decade')
  }

  items () {
    const years = []
    const currentDate = format(this.props.currentDate, 'YYYY-MM-DD')
    const decade = buildDecade(this.props.startDate)

    decade.forEach((year) => {
      const id = format(year, 'YYYY')
      years.push(
        <Item
          id={id}
          clickMethod={this._handleClick}
          focused={(this.props.today || '').slice(0, 4) === id}
          muted={currentDate.slice(0, 3) !== id.slice(0, 3)}
          selected={(this.props.selected || '').slice(0, 4) === id}
          label={id} />
      )
    })

    return years
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={this._handlePreviousClick}> {'<'} </button>
          <button disabled>{this.props.currentDate.getFullYear()}</button>
          <button onClick={this._handleNextClick}> {'>'} </button>
        </div>
        <Grid items={this.items()} itemWidth={4.375} widthUnit={'em'} itemsWide={4} />
      </div>
    )
  }
}

Decade.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  clickMethod: PropTypes.func
}

export default Decade
