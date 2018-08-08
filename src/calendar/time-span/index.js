import React from "react";
import PropTypes from "prop-types";
import Grid from "../grid";
import Item from "../item";

import { build, weekdays } from "../../lib/calendar-fns";
import { format } from "date-fns";

class TimeSpan extends React.Component {
  constructor(props) {
    super(props);

    this.spans = ["month", "year", "decade"];

    this.handleClick = this.handleClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleModeClick = this.handleModeClick.bind(this);
  }

  handleClick(props) {
    const index = this.spans.indexOf(this.props.span);
    const newIndex = index === 0 ? 0 : index - 1;
    this.props.controls.select({ ...props, mode: this.spans[newIndex] });
  }

  handleNextClick() {
    this.props.controls.travelTo("next", this.props.span);
  }

  handlePreviousClick() {
    this.props.controls.travelTo("previous", this.props.span);
  }

  handleModeClick() {
    const index = this.spans.indexOf(this.props.span);
    const newIndex = index > this.spans.length ? index : index + 1;
    this.props.controls.span(this.spans[newIndex]);
  }

  items() {
    const units = [];

    if (this.props.span === "month") {
      weekdays().forEach((weekday, i) => {
        units.push(<Item label={weekday} />);
      });
    }

    build(this.props.span, this.props.startOfCalendar).forEach(date => {
      const dateString = format(date, "YYYY-MM-DD");
      const startOfMonth = format(this.props.startOfMonth, "YYYY-MM-DD");
      let label, id, selected, muted, focused;
      switch (this.props.span) {
        case "decade":
          id = dateString.slice(0, 4);
          label = format(date, "YYYY");
          selected = (this.props.selected || "").slice(0, 4) === id;
          muted = startOfMonth.slice(0, 3) !== id.slice(0, 3);
          focused = (this.props.today || "").slice(0, 4) === id;
          break;
        case "year":
          id = dateString.slice(0, 7);
          label = format(date, "MMM");
          selected = (this.props.selected || "").slice(0, 7) === id;
          muted = startOfMonth.slice(0, 4) !== id.slice(0, 4);
          focused = (this.props.today || "").slice(0, 7) === id;
          break;
        default:
          id = dateString;
          label = date.getDate();
          selected = this.props.selected === id;
          muted = startOfMonth.slice(0, 7) !== id.slice(0, 7);
          focused = this.props.today === id;
      }
      units.push(
        <Item
          id={id}
          clickMethod={this.handleClick}
          date={date}
          focused={focused}
          muted={muted}
          selected={selected}
          label={label}
        />
      );
    });

    return units;
  }

  calcSize() {
    let itemWidth, widthUnit, itemsWide;

    switch (this.props.span) {
      case "decade":
      case "year":
        itemWidth = 4.375;
        widthUnit = "em";
        itemsWide = 4;
        break;
      default:
        itemWidth = 2.5;
        widthUnit = "em";
        itemsWide = 7;
    }
    return {
      itemWidth,
      widthUnit,
      itemsWide
    };
  }

  buttonLabel() {
    switch (this.props.span) {
      case "decade":
        const startYear = this.props.startOfMonth.getFullYear();
        const decade = startYear - (startYear % 10);

        return `${decade} - ${decade + 9}`;
      case "year":
        return this.props.startOfMonth.getFullYear();
      default:
        return format(this.props.startOfMonth, "MMMM YYYY");
    }
  }

  render() {
    const sizes = this.calcSize();
    return (
      <div>
        <div>
          <button onClick={this.handlePreviousClick}> {"<"} </button>
          <button
            disabled={
              this.spans.indexOf(this.props.span) === this.spans.length - 1
            }
            onClick={this.handleModeClick}
          >
            {this.buttonLabel()}
          </button>
          <button onClick={this.handleNextClick}> {">"} </button>
        </div>
        <Grid
          items={this.items()}
          itemWidth={sizes["itemWidth"]}
          widthUnit={sizes["widthUnit"]}
          itemsWide={sizes["itemsWide"]}
        />
      </div>
    );
  }
}

TimeSpan.propTypes = {
  span: PropTypes.string.isRequired,
  startOfMonth: PropTypes.instanceOf(Date).isRequired,
  startOfCalendar: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.string,
  today: PropTypes.string,
  controls: PropTypes.shape({
    select: PropTypes.func,
    span: PropTypes.func,
    travelTo: PropTypes.func
  })
};

export default TimeSpan;
