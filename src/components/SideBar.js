import React, { Component } from 'react'
import Box from './Box'
import ResetContext from './resetContext'

const initialState = {
  choice : null
}

class SideBar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      choice: {...initialState}
    }
  }

  componentDidUpdate(){
    if (this.context === true){
      this.setState({...initialState})
    }
  }

  selection = (ind) => {
      if(this.props.select(ind)) {
          this.setState({choice:ind})
      }
  }
  render() {
    const divStyle = {
      display:'flex',
      gap:'10px'
    }
    const size = [0,1,2,3]

    const { choice } = this.state    
    const {moves,side} = this.props

    var status;
    side === 'left' ? status = 'circle' : status = 'cross'
    
    return (
      <div>
        <h2>{side} SideBar</h2>
        {size.map((item,ind) => 
          <div style={divStyle} onClick={()=>{this.selection(ind)}} key={ind}>
                <Box status={status} highlight={ind === choice ? true : false} size={item} />
                <h3>{moves[ind]}</h3>
          </div> )}
      </div>
    )
  }
}

SideBar.contextType = ResetContext
export default SideBar