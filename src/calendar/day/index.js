import React from 'react'

import { Day } from './styles'

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick () {
    this.props.clickMethod({...this.props})
  }

  render () {
    return (
      <Day onClick={this._handleClick}>{this.props.date.getDate()}</Day>
    )
  }
}

export default Wrapper
