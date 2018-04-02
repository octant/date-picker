import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../grid'
import Item from '../item'

import {
  buildMonth,
  weekdays
} from '../../lib/calendar-fns'
import {
  format
} from '../../lib/date-fns'

class Month extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
    this._handleNextClick = this._handleNextClick.bind(this)
    this._handlePreviousClick = this._handlePreviousClick.bind(this)
    this._handleModeClick = this._handleModeClick.bind(this)
  }

  _handleClick (props) {
    this.props.clickMethod({...props, mode: 'month'})
  }

  _handleNextClick () {
    this.props.travelTo('next', 'month')
  }

  _handlePreviousClick () {
    this.props.travelTo('previous', 'month')
  }

  _handleModeClick () {
    this.props.modeMethod('year')
  }

  items () {
    const days = []

    weekdays().forEach((weekday, i) => {
      days.push(<Item label={weekday} />)
    })

    buildMonth(this.props.startDate).forEach((date) => {
      const dateString = format(date, 'YYYY-MM-DD')
      const currentDate = format(this.props.currentDate, 'YYYY-MM-DD')
      days.push(
        <Item
          id={dateString}
          clickMethod={this._handleClick}
          date={date}
          focused={this.props.today === dateString}
          muted={currentDate.slice(0, 7) !== dateString.slice(0, 7)}
          selected={this.props.selected === dateString}
          label={date.getDate()} />
      )
    })

    return days
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={this._handlePreviousClick}> {'<'} </button>
          <button onClick={this._handleModeClick}>{format(this.props.currentDate, 'MM, YYYY')}</button>
          <button onClick={this._handleNextClick}> {'>'} </button>
        </div>
        <Grid items={this.items()} itemWidth={2.5} widthUnit={'em'} itemsWide={7} />
      </div>
    )
  }
}

Month.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  clickMethod: PropTypes.func
}

export default Month
