import React, { Component } from 'react'
import SideBar from './SideBar';

class RightSideBar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        choice: null
      }
    }

    select = n => {
        this.setState({choice : n},()=>{this.props.makeChoice(n)});
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