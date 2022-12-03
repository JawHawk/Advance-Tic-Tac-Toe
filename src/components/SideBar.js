import React, { Component } from 'react'
import Box from './Box'

class SideBar extends Component {
  render() {
    const { side } = this.props
    const sizes = ['40px','55px','75px','90px']
    
    var status;
    side === 'left' ? status = 'circle' : status = 'cross'
    return (
      <div>
        <h2>{side} SideBar</h2>
        {sizes.map((item,ind) => <Box status={status} key={ind} size={item} /> )}
      </div>
    )
  }
}

export default SideBar