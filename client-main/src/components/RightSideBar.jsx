import React, { Component } from 'react'
import ResetContext from '../pages/resetContext';
import SideBar from './SideBar';

class RightSideBar extends Component {
    select = n => {
        const {turn,makeChoice} = this.props
        if((turn === 'cross') && (this.context.playerNum == 2)){
          makeChoice(n)
          return true
        } else {
          console.log('Its',turn,'turn');
          return false
        }
      }

  render() {
    return (
      <>
          <SideBar side='right' select={this.select} moves={this.props.rmoves}/>
      </>
    )
  }
}

RightSideBar.contextType = ResetContext;
export default RightSideBar