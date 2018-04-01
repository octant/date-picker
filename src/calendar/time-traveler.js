import React from 'react'
import { get, stringToDate, startOf } from '../lib/date-fns'
import {
  startOf as startOfCalendar,
  get as calendarGet
} from '../lib/calendar-fns'

class TimeTraveler extends React.Component {
  constructor (props) {
    super(props)

    const currentDate = stringToDate(props.selected)
    const mode = props.mode || 'month'
    this.state = {
      selected: props.selected,
      mode,
      startOfMonth: startOf(mode, currentDate),
      startOfCalendar: startOfCalendar(mode, currentDate)
    }

    this.selectDate = this.selectDate.bind(this)
    this.selectMode = this.selectMode.bind(this)
    this.timeTravelTo = this.timeTravelTo.bind(this)
  }

  selectDate ({mode, date, id}) {
    this.setState({
      selected: id,
      mode,
      startOfMonth: startOf(mode, stringToDate(id)),
      startOfCalendar: startOfCalendar(mode, stringToDate(id))
    })
  }

  selectMode (mode) {
    this.setState({
      mode,
      startOfMonth: startOf(mode, this.state.startOfMonth),
      startOfCalendar: startOfCalendar(mode, this.state.startOfMonth)
    })
  }

  timeTravelTo (direction, duration) {
    this.setState({
      mode: duration,
      startOfMonth: get(direction, duration, this.state.startOfMonth),
      startOfCalendar: calendarGet(direction, duration, this.state.startOfMonth)
    })
  }

  render () {
    return (
      <div>
        {this.props.children({
          ...this.state,
          controls: {
            selectDate: this.selectDate,
            selectMode: this.selectMode,
            travelTo: this.timeTravelTo
          }
        })}
      </div>
    )
  }
}

export default TimeTraveler
