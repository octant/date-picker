import React from 'react'

import {Month} from './styles'

class Wrapper extends React.Component {
  render () {
    return (
      <Month>
        {this.props.children}
      </Month>
    )
  }
}

export default Wrapper
