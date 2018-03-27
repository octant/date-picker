import React from 'react'
import PropTypes from 'prop-types'

import {
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
      startDate: getCurrentMonth(currentDate),
      selected: props.selected || ''
    }

    this._handleClick = this._handleClick.bind(this)
    this._handleNextClick = this._handleNextClick.bind(this)
    this._handlePrevClick = this._handlePrevClick.bind(this)
  }

  getChildContext () {
    return {
      selected: this.state.selected,
      currentDate: toDateString(this.state.currentDate)
    }
  }

  _handleClick ({date}) {
    this.setState({
      selected: toDateString(date)
    })
  }

  _handleNextClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      startDate: getNextMonth(currentDate)
    })
  }

  _handlePrevClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      startDate: getPreviousMonth(currentDate)
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

Calendar.childContextTypes = {
  selected: PropTypes.string,
  currentDate: PropTypes.string
}

export default Calendar
