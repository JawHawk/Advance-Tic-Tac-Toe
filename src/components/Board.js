import React, { Component } from 'react'
import Box from './Box'

class Board extends Component {
    constructor(props) {
      super(props)
      this.state = {
        elements : [], //for box props
        board:[null,null,null,null,null,null,null,null,null] // board fillings
      }
    }

  componentDidMount() {
    const items = []
    for (let i = 0; i <= 8; i++) {
      const el = { id:i,
        status : null,
        size : null,
        }
      items.push(el)
    }
    this.setState({elements:items})
  }

  boxClick = n => {
    var {elements,board} = this.state
    const [flag,turn,choice] = this.props.changeTurn(elements[n].status,elements[n].size);
    if (flag) {
      elements[n] = {
        id: n,
        status: turn,
        size: choice-1
      }
      board[n] = turn
      this.setState({elements:elements,board:board},()=>console.log(this.state.board))
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
              <Box status={el.status} size={el.size}/> </div>)}
        </div>
      </div>
    )
  }
}

export default Board