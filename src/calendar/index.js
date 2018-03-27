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
import Day from './day'
import Month from './month'
import Grid from './grid'
import Item from './item'

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
      calendar: buildCalendar(getNextMonth(currentDate))
    })
  }

  _handlePrevClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      calendar: buildCalendar(getPreviousMonth(currentDate))
    })
  }

  render () {
    const days = []

    this.state.calendar.forEach((day, i) => {
      const dateString = toDateString(day)
      days.push(<Item key={i} id={dateString} label={day.getDate()} date={day} clickMethod={this._handleClick} />)
    })

    return (
      <Container>
        <h1>{this.state.selected}</h1>
        <Month>
          <div>
            <button onClick={this._handlePrevClick}> {'<'} </button> <button onClick={this._handleNextClick}> {'>'} </button>
          </div>
          <Grid items={days} component={Day} itemWidth={2.5} widthUnit={'em'} itemsWide={7} />
        </Month>
      </Container>
    )
  }
}

export default Calendar
