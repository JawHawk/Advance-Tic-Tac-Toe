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
    const {status ,size} = this.props
    const boxStyle = {
        width:'90px',
        height:'90px',
        border:'1px solid black',
        margin:'15px',
        padding:'5px',
        cursor:'pointer',
    }
    const imgStyle = {
        width:size,
        heigh:size,
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