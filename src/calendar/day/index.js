import React from 'react'

import { Day } from './styles'

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this._onMouseEnter = this._onMouseEnter.bind(this)
  }

  _onMouseEnter () {
    console.log('mouse entered')
  }

  render () {
    return (
      <Day>{this.props.date.getDate()}</Day>
    )
  }
}

export default Wrapper
