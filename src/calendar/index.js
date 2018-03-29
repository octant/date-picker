import React from 'react'
import PropTypes from 'prop-types'

import {
  getCurrentMonth,
  getCurrentYear,
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
      yearStart: getCurrentYear(currentDate),
      startDate: getCurrentMonth(currentDate),
      selected: props.selected || '',
      mode: 'month'
    }

    this._handleClick = this._handleClick.bind(this)
    this._handleNextClick = this._handleNextClick.bind(this)
    this._handleNextYearClick = this._handleNextYearClick.bind(this)
    this._handleModeClick = this._handleModeClick.bind(this)
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
      previousYearMethod: this._handlePrevYearClick,
      modeMethod: this._handleModeClick
    }
  }

  _handleModeClick (mode) {
    this.setState({mode})
  }

  _handleTodayClick () {
    const newDate = new Date()
    this.setState({
      mode: 'month',
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
      mode: 'month',
      currentDate: newDate,
      startDate: getCurrentMonth(newDate),
      yearStart: getCurrentYear(newDate)
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
    const {currentDate} = this.state
    const newDate = getNextYear(currentDate)
    this.setState({
      currentDate: newDate,
      startDate: getCurrentMonth(newDate),
      yearStart: newDate
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
    const newDate = new Date(currentDate.getFullYear() - 1, 0, 1)
    this.setState({
      currentDate: newDate,
      startDate: getCurrentMonth(newDate),
      yearStart: getPreviousYear(currentDate)
    })
  }

  show () {
    switch (this.state.mode) {
      case 'year':
        return <Year
          currentDate={this.state.currentDate}
          startDate={this.state.yearStart}
          clickMethod={this._handleMonthClick} />
      default:
        return <Month
          currentDate={this.state.currentDate}
          startDate={this.state.startDate}
          clickMethod={this._handleClick} />
    }
  }
  render () {
    return (
      <Container>
        <button onClick={this._handleTodayClick}>{format(new Date(), 'YYYY-MM-DD')}</button>
        <TimeContainer>
          {this.show()}
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
  previousYearMethod: PropTypes.func,
  modeMethod: PropTypes.func
}

export default Calendar
