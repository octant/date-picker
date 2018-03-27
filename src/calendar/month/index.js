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
      days.push(
        <Item
          id={toDateString(date)}
          clickMethod={this.props.clickMethod}
          date={date}
          selected={this.context.selected === toDateString(date)}
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
  selected: PropTypes.string
}

export default Month
