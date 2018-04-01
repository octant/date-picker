import React from 'react'

import { Container } from './styles'
import Month from './month'
import Year from './year'
import Decade from './decade'
import TimeContainer from './time-container'
import TimeTraveler from './time-traveler'

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
      <TimeTraveler>
        {fluxCapacitor => {
          const {controls, today} = fluxCapacitor
          return (
            <Container>
              <button onClick={controls.today}>{today}</button>
              <TimeContainer>
                {this.show(fluxCapacitor)}
              </TimeContainer>
            </Container>
          )
        }}
      </TimeTraveler>
    )
  }
}

export default Calendar
