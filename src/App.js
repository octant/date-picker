import React, { Component } from 'react'
import Calendar from './calendar'
import './App.css'

class App extends Component {
  render () {
    return (
      <Calendar selected='2018-02-04' />
    )
  }
}

export default App
