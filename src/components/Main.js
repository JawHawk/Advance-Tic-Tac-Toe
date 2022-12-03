import React, { Component } from 'react'
import LeftSideBar from './LeftSideBar'

class Main extends Component {
  render() {
    const mainStyle = {
        display:'flex',
        flexDirection:'row',
        gap:'50px'
    }
    return (
      <div >
        <h2>Turn of</h2>
        <div style={mainStyle}>
            <LeftSideBar />
            <LeftSideBar />
        </div>
      </div>
    )
  }
}

export default Main