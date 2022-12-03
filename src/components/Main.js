import React, { Component } from 'react'
import Board from './Board'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'

class Main extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      turn:'circle',
      choice: null
    }
  }

  changeTurn = () => {
    const {turn , choice} = this.state
    if (choice !== null) {
    turn === 'circle' ? this.setState({turn : 'cross'})
    : this.setState({turn : 'circle'})

    this.setState({choice:null})
    } else {
      console.log('Select something');
    }
  }

  makeChoice = n => {
    console.log(n);
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

    const { turn } = this.state
    return (
      <div >
        <h2>Turn of {turn}</h2>
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