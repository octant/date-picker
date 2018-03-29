import React from 'react'
import PropTypes from 'prop-types'

import Grid from '../grid'
import Item from '../item'
import { format, monthValues } from '../../lib/date-fns'
import { buildYear } from '../../lib/calendar-fns'

class Year extends React.Component {
  constructor (props) {
    super(props)

    this._handleNextClick = this._handleNextClick.bind(this)
    this._handlePreviousClick = this._handlePreviousClick.bind(this)
  }

  _handleNextClick () {
    this.context.nextYearMethod()
  }

  _handlePreviousClick () {
    this.context.previousYearMethod()
  }

  items () {
    const months = []
    const monthNames = monthValues.abbreviated
    const currentDate = format(this.props.currentDate, 'YYYY-MM-DD')
    const year = buildYear(this.props.startDate)
    console.log(currentDate)
    year.forEach((month) => {
      const id = format(month, 'YYYY-MM')
      months.push(
        <Item
          id={id}
          clickMethod={this.props.clickMethod}
          focused={(this.context.today || '').slice(0, 7) === id}
          muted={currentDate.slice(0, 4) !== id.slice(0, 4)}
          label={monthNames[month.getMonth()]} />
      )
    })

    return months
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={this._handlePreviousClick}> {'<'} </button>
          <button disabled>{this.props.currentDate.getFullYear()}</button>
          <button onClick={this._handleNextClick}> {'>'} </button>
        </div>
        <Grid items={this.items()} itemWidth={4.375} widthUnit={'em'} itemsWide={4} />
      </div>
    )
  }
}

Year.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  clickMethod: PropTypes.func
}

Year.contextTypes = {
  currentDate: PropTypes.string,
  today: PropTypes.string,
  nextYearMethod: PropTypes.func,
  previousYearMethod: PropTypes.func
}

export default Year
