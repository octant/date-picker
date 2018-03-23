import React from 'react'

import Day from './day'

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick ({date}) {
    // console.log(date)
  }

  render () {
    const days = []

    for (let i = 1; i <= 42; i++) {
      days.push(<Day key={i} date={new Date(2018, 2, i)} clickMethod={this._handleClick} />)
    }
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
