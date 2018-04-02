import React from 'react'

import { Container } from './styles'
import Month from './month'
import Year from './year'
import Decade from './decade'
import TimeContainer from './time-container'
import TimeMachine from './time-machine'

class Calendar extends React.Component {
  show (state) {
    const {controls, mode, selected, startOfMonth, startOfCalendar, today} = state

    switch (mode) {
      case 'decade':
        return <Decade
          currentDate={startOfMonth}
          startDate={startOfCalendar}
          selected={selected}
          today={today}
          clickMethod={controls.selectDate}
          modeMethod={controls.selectMode}
          travelTo={controls.travelTo} />
      case 'year':
        return <Year
          currentDate={startOfMonth}
          startDate={startOfCalendar}
          selected={selected}
          today={today}
          clickMethod={controls.selectDate}
          modeMethod={controls.selectMode}
          travelTo={controls.travelTo} />
      default:
        return <Month
          currentDate={startOfMonth}
          startDate={startOfCalendar}
          selected={selected}
          today={today}
          clickMethod={controls.selectDate}
          modeMethod={controls.selectMode}
          travelTo={controls.travelTo} />
    }
  }

  render () {
    return (
      <TimeMachine mode={this.props.mode} selected={this.props.selected}>
        {tmState => {
          return (
            <Container>
              <button onClick={tmState.controls.today}>Today</button>
              <TimeContainer>
                {this.show(tmState)}
              </TimeContainer>
            </Container>
          )
        }}
      </TimeMachine>
    )
  }
}

export default Calendar
