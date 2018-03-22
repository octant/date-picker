import React from 'react'

import Day from './day'

class Calendar extends React.Component {
  render () {
    return (
      <div>
        <h1>Calendar</h1>
        <Day date={new Date()} />
      </div>
    )
  }
}

export default Calendar
