import React from 'react'

import {StyledMonth} from './styles'

class Month extends React.Component {
  render () {
    return (
      <StyledMonth>
        {this.props.children}
      </StyledMonth>
    )
  }
}

export default Month
