import React, { Component } from 'react'
import Box from './Box'

class Board extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
      }
    }

  render() {
    const grid = {
        display:'grid',
        gap:'1px',
        gridTemplateColumns:'repeat(3, 1fr)'
    }
    const elements = [1,2,3,4,5,6,7,8,9]

    const { changeTurn } = this.props
    return (
      <div>
        <h2>Board</h2>
        <div style={grid}>
            {elements.map(id => <div onClick={changeTurn} key={id}><Box status={null} size={null}/></div>)}
        </div>
      </div>
    )
  }
}

export default Board