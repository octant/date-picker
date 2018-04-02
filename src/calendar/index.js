import React from 'react'

import { Container } from './styles'
import TimeContainer from './time-container'
import TimeMachine from './time-machine'
import TimeSpan from './time-span'

class Calendar extends React.Component {
  render () {
    return (
      <TimeMachine mode={this.props.mode} selected={this.props.selected}>
        {tmState => {
          const {controls, mode, selected, startOfMonth, startOfCalendar, today} = tmState
          return (
            <Container>
              <button onClick={tmState.controls.today}>Today</button>
              <TimeContainer>
                <TimeSpan
                  span={mode}
                  startOfMonth={startOfMonth}
                  startOfCalendar={startOfCalendar}
                  today={today}
                  selected={selected}
                  controls={{
                    select: controls.selectDate,
                    travelTo: controls.travelTo,
                    span: controls.selectMode
                  }} />
              </TimeContainer>
            </Container>
          )
        }}
      </TimeMachine>
    )
  }
}

export default Calendar
