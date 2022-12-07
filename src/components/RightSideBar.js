import React, { Component } from 'react'
import SideBar from './SideBar';

class RightSideBar extends Component {
    select = n => {
        const {turn,makeChoice} = this.props
        if(turn === 'cross'){
          makeChoice(n)
          return true
        } else {
          console.log('Its',turn,'turn');
          return false
        }
      }

  render() {
    return (
      <div>
          <SideBar side='right' select={this.select} moves={this.props.rmoves}/>
      </div>
    )
  }
}

export default RightSideBar