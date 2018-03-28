import React from 'react'
import PropTypes from 'prop-types'

import {
  getCurrentMonth,
  getNextMonth,
  getNextYear,
  getPreviousMonth,
  getPreviousYear
} from '../lib/calendar-fns'
import {
  format,
  stringToDate
} from '../lib/date-fns'
import Year from './year'
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
      yearStart: new Date(currentDate.getFullYear(), 0, 1),
      startDate: getCurrentMonth(currentDate),
      selected: props.selected || ''
    }

    this._handleClick = this._handleClick.bind(this)
    this._handleNextClick = this._handleNextClick.bind(this)
    this._handleNextYearClick = this._handleNextYearClick.bind(this)
    this._handleMonthClick = this._handleMonthClick.bind(this)
    this._handlePrevClick = this._handlePrevClick.bind(this)
    this._handlePrevYearClick = this._handlePrevYearClick.bind(this)
    this._handleTodayClick = this._handleTodayClick.bind(this)
  }

  getChildContext () {
    return {
      selected: this.state.selected,
      currentDate: format(this.state.currentDate, 'YYYY-MM-DD'),
      today: format(new Date(), 'YYYY-MM-DD'),
      nextMonthMethod: this._handleNextClick,
      nextYearMethod: this._handleNextYearClick,
      previousMonthMethod: this._handlePrevClick,
      previousYearMethod: this._handlePrevYearClick
    }
  }

  _handleTodayClick () {
    const newDate = new Date()
    this.setState({
      currentDate: newDate,
      startDate: getCurrentMonth(newDate),
      yearStart: new Date(newDate.getFullYear(), 0, 1)
    })
  }

  _handleClick ({date}) {
    this.setState({
      selected: format(date, 'YYYY-MM-DD')
    })
  }

  _handleMonthClick ({id}) {
    const newDate = stringToDate(id)
    this.setState({
      currentDate: newDate,
      startDate: getCurrentMonth(newDate),
      yearStart: new Date(newDate.getFullYear(), 0, 1)
    })
  }

  _handleNextClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      startDate: getNextMonth(currentDate),
      yearStart: new Date(newDate.getFullYear(), 0, 1)
    })
  }

  _handleNextYearClick () {
    const {yearStart} = this.state
    const newDate = new Date(yearStart.getFullYear() + 1, 0, 1)
    this.setState({
      yearStart: getNextYear(newDate)
    })
  }

  _handlePrevClick () {
    const {currentDate} = this.state
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())
    this.setState({
      currentDate: newDate,
      startDate: getPreviousMonth(currentDate),
      yearStart: new Date(newDate.getFullYear(), 0, 1)
    })
  }

  _handlePrevYearClick () {
    const {currentDate} = this.state
    const newDate = getPreviousYear(currentDate)
    this.setState({
      yearStart: newDate
    })
  }

  render () {
    return (
      <Container>
        <button onClick={this._handleTodayClick}>{format(new Date(), 'YYYY-MM-DD')}</button>
        <TimeContainer>
          <Month
            currentDate={this.state.currentDate}
            startDate={this.state.startDate}
            clickMethod={this._handleClick} />
          <Year
            currentDate={this.state.currentDate}
            startDate={this.state.yearStart}
            clickMethod={this._handleMonthClick} />
        </TimeContainer>
      </Container>
    )
  }
}

Calendar.childContextTypes = {
  selected: PropTypes.string,
  currentDate: PropTypes.string,
  today: PropTypes.string,
  nextMonthMethod: PropTypes.func,
  nextYearMethod: PropTypes.func,
  previousMonthMethod: PropTypes.func,
  previousYearMethod: PropTypes.func
}

export default Calendar
