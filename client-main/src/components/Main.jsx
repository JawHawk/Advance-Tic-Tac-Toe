import React, { Component } from 'react'
import Board from './Board'
import LeftSideBar from './LeftSideBar'
import ResetContext from './resetContext'
import RightSideBar from './RightSideBar'
import '../css/main.css'

function initialState(){
  return {
    turn:'circle',
    choice: null,
    lmoves:[3,2,2,2],
    rmoves:[3,2,2,2]
  }
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = initialState()
  } 

  componentDidUpdate(){
    if (this.context === true){
      this.setState(initialState())
    }
  }

  changeTurn = (status,size) => {
    const {turn , choice} = this.state
    if (choice !== null && status !== turn) {
      if (size === null || choice > size ) {
        if(turn === 'circle'){
          var lmoves = this.state.lmoves
          if (lmoves[choice] > 0){
            lmoves[choice] -= 1
            this.setState({turn:'cross',choice:null,lmoves:lmoves})
          } else {
            alert('No moves');
            return [false,turn,choice]
          }
        } else {
          var rmoves = this.state.rmoves
          if (rmoves[choice] > 0) {
            rmoves[choice] -= 1
            this.setState({turn:'circle',choice:null,rmoves:rmoves})
          } else {
            alert('No moves');
            return [false,turn,choice]
          }
        }
        return [true,turn,choice]
      } else {
        alert('Select greater size');
        return [false,turn,choice]
      }
    } else {
      console.log('Select something');
      return [false,turn,choice]
    }
  }

  makeChoice = n => {
    this.setState({choice:n})
  }

  render() {
    const { turn , choice, lmoves,rmoves} = this.state
    return (
      <div className='parent'>
        <h2>Turn of: <i>{turn}</i> | Selection: { choice === null ? 'null' : turn +' '+choice}</h2>
        <div className='child'>
            <LeftSideBar makeChoice={this.makeChoice} turn={turn} lmoves={lmoves}/>
            <Board changeTurn={this.changeTurn} checkWin={this.props.checkWin}/>
            <RightSideBar makeChoice={this.makeChoice} turn={turn} rmoves={rmoves}/>
        </div>
      </div>
    )
  }
}

Main.contextType = ResetContext
export default Main