import React, { Component } from 'react'
import SideBar from './SideBar'

class LeftSideBar extends Component {
  render() {
    return(
        <div>
            <SideBar side='left'/>
        </div>
    )
  }
}

export default LeftSideBar