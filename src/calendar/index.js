import React from 'react'

import {
  buildCalendar,
  getCurrentMonth,
  normalizeDate,
  toDateString
} from '../lib/calendar-fns'
import Day from './day'

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    const selected = props.selected || toDateString(new Date())
    const currentDate = normalizeDate(selected)

    this.state = {
      currentDate: currentDate,
      calendar: buildCalendar(getCurrentMonth(currentDate)),
      selected: props.selected || ''
    }

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick ({date}) {
    this.setState({
      selected: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    })
  }

  render () {
    const days = []

    this.state.calendar.forEach((day, i) => {
      const dateString = toDateString(day)
      days.push(<Day key={i} id={dateString} date={day} clickMethod={this._handleClick} />)
    })

    return (
      <div>
        <h1>Calendar</h1>
        {days.map((day) => {
          return day
        })}
      </div>
    )
  }
}

export default Calendar
