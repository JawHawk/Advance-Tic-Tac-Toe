import React, { Component } from 'react'
import SideBar from './SideBar'

class LeftSideBar extends Component {
  select = n => {
    const {turn,makeChoice} = this.props
        if(turn === 'circle'){
          makeChoice(n)
          return true
        } else {
          console.log('Its',turn,'turn');
          return false
        }
  }

  render() {
    return(
        <div>
            <SideBar side='left' select={this.select} moves={this.props.lmoves}/>
        </div>
    )
  }
}

export default LeftSideBar