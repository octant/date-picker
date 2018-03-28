import React from 'react'
import PropTypes from 'prop-types'

import {
  getCurrentMonth,
  getNextMonth,
  getPreviousMonth
} from '../lib/calendar-fns'
import {
  format,
  stringToDate
} from '../lib/date-fns'
import {Container} from './styles'
import TimeContainer from './time-container'
import Month from './month'

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    const selected = props.selected || format(new Date(), 'YYYY-MM-DD')
    const currentDate = stringToDate(selected)

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
      currentDate: format(this.state.currentDate, 'YYYY-MM-DD'),
      today: format(new Date(), 'YYYY-MM-DD')
    }
  }

  _handleClick ({date}) {
    this.setState({
      selected: format(date, 'YYYY-MM-DD')
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
  currentDate: PropTypes.string,
  today: PropTypes.string
}

export default Calendar
