import React, { Component } from 'react'
import Box from './Box'
import ResetContext from '../pages/resetContext'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function initialState(){
  const elements = []
  const board = []
  for (let i = 0; i <= 8; i++) {
    elements.push({ id:i, status : null, size : null })
    board.push(null)
  }
  return {elements, board, show: false}
} 

class Board extends Component {
    constructor(props) {
      super(props)
      this.state = initialState()
    }
  
  componentDidMount() {
    const {socket} = this.context;
    socket.on('move-update',({elements, board})=> {
      this.props.changeTurnSocket(elements);
      this.setState({elements: elements, board: board},()=>{
        this.props.checkWin(board);
      });
    });
  } 

  componentDidUpdate(){
    if (this.context.reset === true){
      this.setState(initialState())
    }
  }

  boxClick = n => {
    const { socket, roomId } = this.context 
    var {elements,board} = this.state
    socket.emit('play-move',roomId);
    socket.once('play',(bool)=>{
      if(bool) {
        const [flag,turn,choice] = this.props.changeTurn(elements[n].status,elements[n].size);
        if (flag) {
          elements[n] = {
            id: n,
            status: turn,
            size: choice
          }
          board[n] = turn
          this.setState({elements:elements,board:board},()=>{
            socket.emit('move-done',{roomId: roomId, elements: elements, board: board});
            this.props.checkWin(board);
          })
        } 
      } else {
        this.setState({show : true});
      }
    })
    
  }

  render() {
    const grid = {
        display:'grid',
        gap:'25px',
        gridTemplateColumns:'repeat(3, 1fr)'
    }
    const {elements} = this.state
    return (
      <div className='d-flex flex-column justify-content-center'>
        <div style={grid}>
            {elements.map(el => <div key={el.id} className='d-flex justify-content-center' onClick={()=>{this.boxClick(el.id)}}>
              <Box status={el.status} highlight={false} size={el.size}/> </div>)}
        </div>
        <Row>
          <Col xs={6}>
            <Toast className='toast' onClose={() => this.setState({show:false})} show={this.state.show} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Notification</strong>
              </Toast.Header>
              <Toast.Body>Wait till other Player Joins !</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </div>
    )
  }
}

Board.contextType = ResetContext
export default Board