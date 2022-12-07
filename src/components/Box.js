import React, { Component } from 'react'
import circle from '../img/circle.png'
import cross from '../img/cross.jpg'
import ResetContext from './resetContext'

const initialState = {
  sizes : ['40px','55px','75px','90px']
}

class Box extends Component {
    constructor(props) {
      super(props)
      this.state = initialState
    }

    componentDidUpdate(){
      if (this.context === true){
        this.setState(initialState)
      }
    }

  render() {
    const {sizes} = this.state
    const {status, highlight ,size} = this.props
    const boxStyle = {
        width:'90px',
        height:'90px',
        border:'1px solid black',
        padding:'5px',
        cursor:'pointer',
    }
    if(highlight){
      boxStyle['border'] = '2px solid blue'
    }
    const imgStyle = {
        width: sizes[size],
        heigh: sizes[size]
    }
    return (
      <div style={boxStyle}>
        {status === 'circle' && <img alt='circle' style={imgStyle} src={circle}></img> }
        {status === 'cross' && <img alt='cross' style={imgStyle} src={cross}></img> }
      </div>
    )
  }
}

Box.contextType = ResetContext
export default Box