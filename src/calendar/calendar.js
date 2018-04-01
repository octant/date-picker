import React from 'react'

import { Container } from './styles'
import { format } from '../lib/date-fns'
import Month from './month'
import Year from './year'
import TimeContainer from './time-container'
import TimeTraveler from './time-traveler'

class Calendar extends React.Component {
  render () {
    return (
      <TimeTraveler>
        {fluxCapicitor => {
          const {selected, startOfMonth, startOfCalendar, mode, controls} = fluxCapicitor
          return (
            <Container>
              <button onClick={this._handleTodayClick}>{format(new Date(), 'YYYY-MM-DD')}</button>
              <TimeContainer>
                {
                  mode === 'month'
                    ? <Month
                      currentDate={startOfMonth}
                      startDate={startOfCalendar}
                      selected={selected}
                      today={format(new Date(), 'YYYY-MM-DD')}
                      clickMethod={controls.selectDate}
                      modeMethod={controls.selectMode}
                      travelTo={controls.travelTo} />
                    : <Year
                      currentDate={startOfMonth}
                      startDate={startOfCalendar}
                      selected={selected}
                      today={format(new Date(), 'YYYY-MM')}
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
