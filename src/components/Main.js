import React, { Component } from 'react'
import Board from './Board'
import LeftSideBar from './LeftSideBar'
import ResetContext from './resetContext'
import RightSideBar from './RightSideBar'

const initialState = {
      turn:'circle',
      choice: null,
      lmoves:[3,2,2,2],
      rmoves:[3,2,2,2]
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {...initialState,lmoves:[...initialState.lmoves],rmoves:[...initialState.rmoves]}
  } 

  componentDidUpdate(){
    if (this.context === true){
      this.setState({...initialState,lmoves:[...initialState.lmoves],rmoves:[...initialState.rmoves]})
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
            console.log('No moves');
            return [false,turn,choice]
          }
        } else {
          var rmoves = this.state.rmoves
          if (rmoves[choice] > 0) {
            rmoves[choice] -= 1
            this.setState({turn:'circle',choice:null,rmoves:rmoves})
          } else {
            console.log('No moves');
            return [false,turn,choice]
          }
        }
        return [true,turn,choice]
      } else {
        console.log('Select greater size');
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
    const mainStyle = {
        display:'flex',
        flexDirection:'row',
        gap:'50px',
        justifyContent:'space-between',
        width:'100vw'
    }
    console.log(this.context);
    const { turn , choice, lmoves,rmoves} = this.state
    return (
      <div >
        <h2>Turn of {turn} with selected { choice === null ? 'Nothing' :  turn +' '+choice}</h2>
        <div style={mainStyle}>
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