import React, { Component } from 'react'
import circle from '../img/circle.png'
import cross from '../img/cross.jpg'

class Box extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
      }
    }
  render() {
    const { status , size} = this.props
    const boxStyle = {
        width:'90px',
        height:'90px',
        border:'1px solid black',
        margin:'15px'
    }
    const imgStyle = {
        width:size,
        heigh:size,
    }
    
    return (
      <div>
        {status === 'circle'  && <div style={boxStyle}><img alt='circle' style={imgStyle} src={circle}></img></div>}
        {status === 'cross' && <div style={boxStyle}><img alt='cross' style={imgStyle} src={cross}></img></div>}
      </div>
    )
  }
}

export default Box