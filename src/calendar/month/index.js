import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../grid'
import Item from '../item'

import {
  buildCalendar
} from '../../lib/calendar-fns'

class Month extends React.Component {
  constructor (props) {
    super(props)

    const dates = buildCalendar(props.startDate)

    this.state = {dates}
  }

  items () {
    const days = []
    this.state.dates.forEach((date) => {
      days.push(<Item label={date.getDate()} />)
    })

    return days
  }

  render () {
    return (
      <Grid items={this.items()} />
    )
  }
}

Month.propTypes = {
  startDate: PropTypes.instanceOf(Date)
}

export default Month
