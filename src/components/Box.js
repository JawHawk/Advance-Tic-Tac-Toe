import React, { Component } from 'react'
import circle from '../img/circle.png'
import cross from '../img/cross.jpg'

class Box extends Component {
    constructor(props) {
      super(props)
      this.state = {
        sizes : ['40px','55px','75px','90px']
      }
    }
  render() {
    const {status, size} = this.props
    const boxStyle = {
        width:'90px',
        height:'90px',
        border:'1px solid black',
        padding:'5px',
        cursor:'pointer',
    }
    const imgStyle = {
        width:this.state.sizes[size],
        heigh:this.state.sizes[size],
    }
    return (
      <div style={boxStyle}>
        {status === 'circle' && <img alt='circle' style={imgStyle} src={circle}></img> }
        {status === 'cross' && <img alt='cross' style={imgStyle} src={cross}></img> }
      </div>
    )
  }
}

export default Box