import React from "react";
import { format, get, stringToDate, startOf } from "../../lib/date-fns";
import {
  startOf as startOfCalendar,
  get as calendarGet
} from "../../lib/calendar-fns";

class TimeMachine extends React.Component {
  constructor(props) {
    super(props);

    const currentDate = stringToDate(props.selected);
    const mode = props.mode || "month";
    this.state = {
      selected: props.selected,
      today: format(new Date(), "YYYY-MM-DD"),
      mode,
      startOfMonth: startOf(mode, currentDate),
      startOfCalendar: startOfCalendar(mode, currentDate)
    };

    this.selectDate = this.selectDate.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.timeTravelTo = this.timeTravelTo.bind(this);
    this.today = this.today.bind(this);
  }

  selectDate({ mode, id }) {
    // TODO better way to determine if selected should be set
    this.setState(prev => ({
      selected: id.length === 10 ? id : prev.selected,
      mode,
      startOfMonth: startOf(mode, stringToDate(id)),
      startOfCalendar: startOfCalendar(mode, stringToDate(id))
    }));
  }

  selectMode(mode) {
    this.setState(prev => ({
      mode,
      startOfMonth: startOf(mode, prev.startOfMonth),
      startOfCalendar: startOfCalendar(mode, prev.startOfMonth)
    }));
  }

  timeTravelTo(direction, duration) {
    this.setState(prev => ({
      mode: duration,
      startOfMonth: get(direction, duration, prev.startOfMonth),
      startOfCalendar: calendarGet(direction, duration, prev.startOfMonth)
    }));
  }

  today() {
    this.setState(prev => ({
      startOfMonth: startOf(prev.mode, stringToDate(prev.today)),
      startOfCalendar: startOfCalendar(prev.mode, stringToDate(prev.today))
    }));
  }

  render() {
    return (
      <div>
        {this.props.children({
          ...this.state,
          controls: {
            today: this.today,
            selectDate: this.selectDate,
            selectMode: this.selectMode,
            travelTo: this.timeTravelTo
          }
        })}
      </div>
    );
  }
}

export default TimeMachine;
