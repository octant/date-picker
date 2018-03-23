import React from 'react'

const WithControl = (ControlledComponent) => {
  return class extends React.Component {
    constructor (props) {
      super(props)

      this._handleClick = this._handleClick.bind(this)
    }

    _handleClick (e) {
      if (this.props.clickMethod) {
        this.props.clickMethod({...this.props})
      }
    }

    render () {
      return <ControlledComponent onClick={this._handleClick} {...this.props} />
    }
  }
}

export default WithControl
