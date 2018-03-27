import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../grid'
import Item from '../item'

import {
  buildCalendar,
  toDateString,
  weekdays
} from '../../lib/calendar-fns'

class Month extends React.Component {
  items () {
    const days = []

    weekdays().forEach((weekday, i) => {
      days.push(<Item label={weekday} />)
    })

    buildCalendar(this.props.startDate).forEach((date) => {
      const dateString = toDateString(date)
      const currentDate = this.context.currentDate || toDateString(new Date())
      days.push(
        <Item
          id={dateString}
          clickMethod={this.props.clickMethod}
          date={date}
          muted={currentDate.slice(0, 7) !== dateString.slice(0, 7)}
          selected={this.context.selected === dateString}
          label={date.getDate()} />
      )
    })

    return days
  }

  render () {
    return (
      <Grid items={this.items()} itemWidth={2.5} widthUnit={'em'} itemsWide={7} />
    )
  }
}

Month.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  clickMethod: PropTypes.func
}

Month.contextTypes = {
  selected: PropTypes.string,
  currentDate: PropTypes.string
}

export default Month
