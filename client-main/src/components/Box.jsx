import React, { Component } from 'react'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'
import ResetContext from './resetContext'

const initialState = {
  sizes : ['30px','45px','60px','75px']
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
        width:'15vw', height:'15vw',
        maxWidth:'90px', maxHeight:'90px',
        border:'1px solid black',
        padding:'5px',
        cursor:'pointer',
        borderRadius:'10px',
        background:'#F9CB86'
    }
    if(highlight){
      boxStyle['border'] = '2px solid blue'
    }
    if(!status){
      boxStyle['background'] = '#58a6bf'
    }

    const imgStyle = {
        width: sizes[size],
        heigh: sizes[size],
        position: 'relative',
        top:'50%',
        transform: 'translateY(-50%)'
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