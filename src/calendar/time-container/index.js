import React from 'react'

import {StyledTimeContainer} from './styles'

class TimeContainer extends React.Component {
  render () {
    return (
      <StyledTimeContainer>
        {this.props.children}
      </StyledTimeContainer>
    )
  }
}

export default TimeContainer
