import React from 'react'

import {StyledItem} from './styles'

class Item extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick () {
    if (this.props.clickMethod) {
      this.props.clickMethod({...this.props})
    }
  }

  render () {
    return (
      <StyledItem
        clickable={this.props.clickMethod !== undefined}
        onClick={this._handleClick}
        muted={this.props.muted}
        focused={this.props.focused}
        selected={this.props.selected}
        highlighted={this.props.highlighted}>
        {this.props.label}
      </StyledItem>
    )
  }
}

export default Item
