import React, { Component } from 'react'
import ResetContext from '../pages/resetContext'
import SideBar from './SideBar'

class LeftSideBar extends Component {
  select = n => {
    const {turn,makeChoice} = this.props
        if((turn === 'circle') && (this.context.playerNum == 1)) {
          makeChoice(n)
          return true
        } else {
          return false
        }
  }

  render() {
    return(
        <>
            <SideBar side='left' select={this.select} moves={this.props.lmoves}/>
        </>
    )
  }
}

LeftSideBar.contextType = ResetContext;
export default LeftSideBar