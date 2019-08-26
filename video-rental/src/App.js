import React, { Component } from 'react'
import './App.css'
import Movies from './components/movies/movies'

class App extends Component {
  state = {}
  render () {
    return (
      <main role='main' className='container'>
        <Movies />
      </main>
    )
  }
}

export default App
