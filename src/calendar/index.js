import React from "react";

import { Container } from "./styles";
import TimeContainer from "./time-container";
import TimeMachine from "./time-machine";
import TimeSpan from "./time-span";
import { format } from "date-fns";

class Calendar extends React.Component {
  render() {
    return (
      <TimeMachine mode={this.props.mode} selected={this.props.selected}>
        {tmState => {
          const {
            controls,
            mode,
            selected,
            startOfMonth,
            startOfCalendar,
            today
          } = tmState;
          return (
            <Container>
              <div style={{ padding: `0.5em 0.5em 0 0.5em` }}>
                <button onClick={controls.today}>
                  {format(today, "dddd, MMMM D, YYYY")}
                </button>
              </div>
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
                  }}
                />
              </TimeContainer>
            </Container>
          );
        }}
      </TimeMachine>
    );
  }
}

export default Calendar;
