import React, { Component } from 'react'
import Board from './Board'
import LeftSideBar from './LeftSideBar'
import ResetContext from '../pages/resetContext'
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
    if (this.context.reset === true){
      this.setState(initialState())
    }
  }

  changeTurnSocket = elements => {
    var lmoves = [3,2,2,2];
    var rmoves = [3,2,2,2];
    for( const el of elements ){
      if(el.status == 'circle'){
        lmoves[el.size] -= 1;
      } 
      if(el.status == 'cross') {
        rmoves[el.size] -= 1;
      }
    }
    this.state.turn == 'circle' ? this.setState({turn: 'cross',choice:null, lmoves:lmoves, rmoves: rmoves})
        : this.setState({turn: 'circle', choice:null, lmoves:lmoves, rmoves:rmoves});
  }

  changeTurn = (status,size) => {
    const {turn , choice} = this.state
    if (choice !== null && status !== turn) {
      if (size === null || choice > size ) {
        var moves;
        turn == 'circle' ? moves = this.state.lmoves : moves = this.state.rmoves;
        if (moves[choice] > 0){
          moves[choice] -= 1
        } else {
          alert('No moves');
          return [false,turn,choice]
        }
        turn == 'circle' ? this.setState({turn: 'cross',choice:null,lmoves:moves})
        : this.setState({turn: 'circle',choice:null,rmoves:moves});
        return [true,turn,choice]
      } else {
        alert('Select greater size');
        return [false,turn,choice]
      }
    } else {
      return [false,turn,choice]
    }
  }

  makeChoice = n => {
    this.setState({choice:n})
  }

  render() {
    const { turn , choice, lmoves,rmoves} = this.state;
    return (
      <div className='parent'>
        <p>
          Turn of: <span>{turn === 'circle' ? 'Player 1' : 'Player 2'}</span> 
        </p>
        <p>
          Current Selection: <span>{ choice === null ? 'None' : turn +' '+choice}</span>
        </p>
        <div className='child'>
            <LeftSideBar makeChoice={this.makeChoice} turn={turn} lmoves={lmoves}/>
            <Board changeTurn={this.changeTurn} changeTurnSocket={this.changeTurnSocket} checkWin={this.props.checkWin}/>
            <RightSideBar makeChoice={this.makeChoice} turn={turn} rmoves={rmoves}/>
        </div>
      </div>
    )
  }
}

Main.contextType = ResetContext
export default Main