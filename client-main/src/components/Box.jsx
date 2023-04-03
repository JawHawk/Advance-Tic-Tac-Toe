import React, { Component } from 'react'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'
import ResetContext from '../pages/resetContext'

function initialState(){
  if(window.innerWidth > 550) {
    return ({ sizes : ['30px','45px','60px','75px'] })
  } else {
    return ({ sizes : ['15px', '25px','35px', '50px']})
  }
} 

class Box extends Component {
    constructor(props) {
      super(props)
      this.state = initialState();
    }
    componentDidMount() {
      window.addEventListener('resize', () => {
        this.setState(initialState);
      })
    }

    componentDidUpdate(){
      if (this.context.reset === true){
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
        background:'#F9CB86',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    }
    if(highlight){
      boxStyle['border'] = '2px solid blue'
    }
    if(!status){
      boxStyle['background'] = '#58a6bf'
    }

    const imgStyle = {
        width: sizes[size],
        height: sizes[size]
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