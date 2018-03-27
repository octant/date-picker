import React from 'react'

import {StyledGrid} from './styles'

class Grid extends React.Component {
  render () {
    return <StyledGrid itemWidth={this.props.itemWidth} itemsWide={this.props.itemsWide} widthUnit={this.props.widthUnit}>
      {this.props.items.map((item, i) => {
        return React.cloneElement(item, {key: i})
      })}
    </StyledGrid>
  }
}

export default Grid
