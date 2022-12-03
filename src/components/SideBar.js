import React, { Component } from 'react'
import Box from './Box'

class SideBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {}
  }
  render() {
    const { side,select } = this.props
    const sizes = ['40px','55px','75px','90px']
    
    var status;
    side === 'left' ? status = 'circle' : status = 'cross'
    return (
      <div>
        <h2>{side} SideBar</h2>
        {sizes.map((item,ind) => <div onClick={()=> {select(ind+1)}} key={ind + 1}><Box status={status}  size={item} /></div> )}
      </div>
    )
  }
}

export default SideBar