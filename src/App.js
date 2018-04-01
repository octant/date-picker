import React, { Component } from 'react'
import Calendar from './calendar'
import Calendar2 from './calendar/calendar'

import './App.css'

class App extends Component {
  render () {
    const style = {
      width: '10em',
      color: 'pink',
      position: 'relative'
    }
    return (
      <div>
        <div className='wtf' stlyle={style}>
          <Calendar2 />
        </div>
        <hr />
        <div stlyle={style}>
          <Calendar selected='2018-02-04' />
        </div>
      </div>
    )
  }
}

export default App
