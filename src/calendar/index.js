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
        <Day date={new Date()} clickMethod={this._handleClick} />
      </div>
    )
  }
}

export default Calendar
