import React, { Component } from 'react'
import SideBar from './SideBar'

class LeftSideBar extends Component {
  select = n => {
    this.props.makeChoice(n,'circle')
  }

  render() {
    return(
        <div>
            <SideBar side='left' select={this.select}/>
        </div>
    )
  }
}

export default LeftSideBar