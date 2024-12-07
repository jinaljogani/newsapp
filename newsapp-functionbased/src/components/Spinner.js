import React, { Component } from 'react'
import loading from './loading.gif.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3" src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
//db623ef18745404d8bd8292f6a77b276