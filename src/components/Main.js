import React, { Component } from 'react'
import Board from './Board'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'

class Main extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      turn:'circle',
      choice: null,
    }
  }

  changeTurn = (status,size) => {
    const {turn , choice} = this.state

    if (choice !== null && status !== turn) {
      if (size === null || (choice-1)>size ) {
        turn === 'circle' ? this.setState({turn : 'cross',choice:null}) 
        : this.setState({turn : 'circle',choice:null})


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

  makeChoice = (n,turnn) => {
    if (this.state.turn === turnn) {
    this.setState({choice:n})
    } else {
      console.log('Its',this.state.turn,'turn');
    } 
  }

  render() {
    const mainStyle = {
        display:'flex',
        flexDirection:'row',
        gap:'50px',
        justifyContent:'space-between',
        width:'100vw'
    }

    const { turn , choice} = this.state
    return (
      <div >
        <h2>Turn of {turn} with selected {!choice ? 'Nothing' :  turn + choice}</h2>
        <div style={mainStyle}>
            <LeftSideBar makeChoice={this.makeChoice}/>
            <Board changeTurn={this.changeTurn}/>
            <RightSideBar makeChoice={this.makeChoice} />
        </div>
      </div>
    )
  }
}

export default Main