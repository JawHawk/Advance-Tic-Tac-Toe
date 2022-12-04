import React, { Component } from 'react'
import Box from './Box'

class SideBar extends Component {
  render() {
    const { side,select } = this.props
    const size = [0,1,2,3]
    
    var status;
    side === 'left' ? status = 'circle' : status = 'cross'
    return (
      <div>
        <h2>{side} SideBar</h2>
        {size.map((item,ind) => <div onClick={()=> {select(ind+1)}} key={ind + 1}><Box status={status}  size={item} /></div> )}
      </div>
    )
  }
}

export default SideBar