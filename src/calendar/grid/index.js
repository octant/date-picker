import React from 'react'

import {StyledGrid} from './styles'

class Grid extends React.Component {
  render () {
    return <StyledGrid itemWidth={this.props.itemWidth} itemsWide={this.props.itemsWide} widthUnit={this.props.widthUnit}>
      {this.props.items.map((item, i) => {
        return item
      })}
    </StyledGrid>
  }
}

export default Grid
