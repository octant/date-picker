import React from 'react'

import {
  buildCalendar,
  getCurrentMonth,
  getNextMonth,
  getPreviousMonth,
  normalizeDate,
  toDateString
} from '../lib/calendar-fns'
import {Container} from './styles'
import TimeContainer from './time-container'
import Month from './month'

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    const selected = props.selected || toDateString(new Date())
    const currentDate = normalizeDate(selected)

    this.state = {
      currentDate: currentDate,
      calendar: buildCalendar(getCurrentMonth(currentDate)),
      startDate: getCurrentMonth(currentDate),
      selected: props.selected || ''
    }

    this._handleClick = this._handleClick.bind(this)
    this._handleNextClick = this._handleNextClick.bind(this)
    this._handlePrevClick = this._handlePrevClick.bind(this)
  }

  _handleClick ({date}) {
    this.setState({
      selected: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    })
  }

  _handleNextClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      startDate: getNextMonth(currentDate),
      calendar: buildCalendar(getNextMonth(currentDate))
    })
  }

  _handlePrevClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      startDate: getPreviousMonth(currentDate),
      calendar: buildCalendar(getPreviousMonth(currentDate))
    })
  }

  render () {
    return (
      <Container>
        <h1>{this.state.selected}</h1>
        <TimeContainer>
          <div>
            <button onClick={this._handlePrevClick}> {'<'} </button> <button onClick={this._handleNextClick}> {'>'} </button>
          </div>
          <Month startDate={this.state.startDate} clickMethod={this._handleClick} />
        </TimeContainer>
      </Container>
    )
  }
}

export default Calendar
