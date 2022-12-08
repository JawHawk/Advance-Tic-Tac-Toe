import React, { Component } from 'react'
import Box from './Box'
import ResetContext from './resetContext'

function initialState(){
  const elements = []
  const board = []
  for (let i = 0; i <= 8; i++) {
    elements.push({ id:i, status : null, size : null })
    board.push(null)
  }
  return {elements, board}
} 

class Board extends Component {
    constructor(props) {
      super(props)
      this.state = initialState()
    }
  
  componentDidUpdate(){
    if (this.context === true){
      this.setState(initialState())
    }
  }

  boxClick = n => {
    var {elements,board} = this.state
    const [flag,turn,choice] = this.props.changeTurn(elements[n].status,elements[n].size);
    if (flag) {
      elements[n] = {
        id: n,
        status: turn,
        size: choice
      }
      board[n] = turn
      this.setState({elements:elements,board:board},()=>{this.props.checkWin(board)})
    } 
    
  }

  render() {
    const grid = {
        display:'grid',
        gap:'25px',
        gridTemplateColumns:'repeat(3, 1fr)'
    }

    const {elements} = this.state
    return (
      <div>
        <h2>Board</h2>
        <div style={grid}>
            {elements.map(el => <div key={el.id} onClick={()=>{this.boxClick(el.id)}}>
              <Box status={el.status} highlight={false} size={el.size}/> </div>)}
        </div>
      </div>
    )
  }
}

Board.contextType = ResetContext
export default Board