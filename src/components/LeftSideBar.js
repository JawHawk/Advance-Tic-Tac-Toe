import React, { Component } from 'react'
import SideBar from './SideBar'

class LeftSideBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      choice:null
    }
  }
  select = n => {
    this.setState({choice : n},()=>{this.props.makeChoice(n)});
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