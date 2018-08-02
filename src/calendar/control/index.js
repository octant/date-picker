import React from "react";

class Control extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {}

  render() {
    return (
      <div onClick={this._handleClick}>{this.props.children(this.props)}</div>
    );
  }
}

export default Control;
