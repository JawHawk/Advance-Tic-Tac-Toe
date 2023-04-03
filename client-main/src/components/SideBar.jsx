import React, { Component } from 'react'
import Box from './Box'
import ResetContext from '../pages/resetContext'
import '../css/sidebar.css'

function initialState(){
  return {choice:null}
}

class SideBar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      choice: initialState()
    }
  }

  componentDidUpdate(){
    if (this.context === true){
      this.setState(initialState())
    }
  }

  selection = (ind) => {
      if(this.props.select(ind)) {
          this.setState({choice:ind})
      }
  }
  render() {
    const size = [0,1,2,3]

    const { choice } = this.state    
    const {moves,side} = this.props

    var status;
    side === 'left' ? status = 'circle' : status = 'cross'
    
    return (
      <div className='sidebar'>
        <p className='playerLead lead' style={{fontSize:'2rem'}}>
          {side === 'left' ? 'Player 1' : 'Player 2' }
        </p>
        <hr  style={{height: '5px', margin: '5px 0 15px 0'}}/>
        <div className='SBparent'>
          {size.map((item,ind) => 
            <div className='SBchild' onClick={()=>{this.selection(ind)}} key={ind}>
                  <Box status={status} highlight={ind === choice ? true : false} size={item} />
                  <p className='moves'>x{moves[ind]}</p>
            </div> )}
        </div>
      </div>
    )
  }
}

SideBar.contextType = ResetContext
export default SideBar