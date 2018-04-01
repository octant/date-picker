import React from 'react'

import { Container } from './styles'
import Month from './month'
import Year from './year'
import TimeContainer from './time-container'
import TimeTraveler from './time-traveler'

class Calendar extends React.Component {
  render () {
    return (
      <TimeTraveler>
        {fluxCapicitor => {
          const {controls, mode, selected, startOfMonth, startOfCalendar, today} = fluxCapicitor
          return (
            <Container>
              <button onClick={controls.today}>{today}</button>
              <TimeContainer>
                {
                  mode === 'month'
                    ? <Month
                      currentDate={startOfMonth}
                      startDate={startOfCalendar}
                      selected={selected}
                      today={today}
                      clickMethod={controls.selectDate}
                      modeMethod={controls.selectMode}
                      travelTo={controls.travelTo} />
                    : <Year
                      currentDate={startOfMonth}
                      startDate={startOfCalendar}
                      selected={selected}
                      today={today}
                      clickMethod={controls.selectDate}
                      modeMethod={controls.selectMode}
                      travelTo={controls.travelTo} />
                }
              </TimeContainer>
            </Container>
          )
        }}
      </TimeTraveler>
    )
  }
}

export default Calendar
