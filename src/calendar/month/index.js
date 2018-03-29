import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../grid'
import Item from '../item'

import {
  buildCalendar,
  weekdays
} from '../../lib/calendar-fns'
import {
  format
} from '../../lib/date-fns'

class Month extends React.Component {
  constructor (props) {
    super(props)

    this._handleNextClick = this._handleNextClick.bind(this)
    this._handlePreviousClick = this._handlePreviousClick.bind(this)
    this._handleModeClick = this._handleModeClick.bind(this)
  }

  _handleNextClick () {
    this.context.nextMonthMethod(format(this.props.startDate, 'YYYY-MM'))
  }

  _handlePreviousClick () {
    this.context.previousMonthMethod(format(this.props.startDate, 'YYYY-MM'))
  }

  _handleModeClick () {
    this.context.modeMethod('year')
  }

  items () {
    const days = []

    weekdays().forEach((weekday, i) => {
      days.push(<Item label={weekday} />)
    })

    buildCalendar(this.props.startDate).forEach((date) => {
      const dateString = format(date, 'YYYY-MM-DD')
      const currentDate = format(this.props.currentDate, 'YYYY-MM-DD')
      days.push(
        <Item
          id={dateString}
          clickMethod={this.props.clickMethod}
          date={date}
          focused={this.context.today === dateString}
          muted={currentDate.slice(0, 7) !== dateString.slice(0, 7)}
          selected={this.context.selected === dateString}
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

Month.contextTypes = {
  selected: PropTypes.string,
  today: PropTypes.string,
  nextMonthMethod: PropTypes.func,
  previousMonthMethod: PropTypes.func,
  modeMethod: PropTypes.func
}

export default Month
