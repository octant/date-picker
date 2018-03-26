import React from 'react'

import {StyledItem} from './styles'

class Item extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick () {
    this.props.clickMethod({...this.props})
  }

  render () {
    return <StyledItem onClick={this._handleClick}>{this.props.label}</StyledItem>
  }
}

export default Item
