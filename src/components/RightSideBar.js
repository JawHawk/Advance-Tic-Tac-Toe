import React, { Component } from 'react'
import SideBar from './SideBar';

class RightSideBar extends Component {
  
    select = n => {
      this.props.makeChoice(n,'cross')
      }

  render() {
    return (
      <div>
            <SideBar side='right' select={this.select}/>
      </div>
    )
  }
}

export default RightSideBar