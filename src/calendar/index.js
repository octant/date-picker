import React from 'react'

import Day from './day'

class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick ({date}) {
    console.log(date)
  }

  render () {
    return (
      <div>
        <h1>Calendar</h1>
        <Day date={new Date(2018, 2, 1)} clickMethod={this._handleClick} />
        <Day date={new Date(2018, 2, 2)} clickMethod={this._handleClick} />
      </div>
    )
  }
}

export default Calendar
