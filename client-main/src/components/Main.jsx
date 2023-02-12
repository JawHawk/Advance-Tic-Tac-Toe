import React, { Component } from 'react'
import Board from './Board'
import LeftSideBar from './LeftSideBar'
import ResetContext from '../pages/resetContext'
import RightSideBar from './RightSideBar'
import '../css/main.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function initialState(){
  return {
    turn:'circle',
    choice: null,
    lmoves:[3,2,2,2],
    rmoves:[3,2,2,2],
    show: false
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

  changeTurnSocket = board => {
    var lmoves = [3,2,2,2];
    var rmoves = [3,2,2,2];
    for( const el of board ){
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
        turn == 'circle' ? moves = [...this.state.lmoves] : moves = [...this.state.rmoves];
        if (moves[choice] > 0){
          moves[choice] -= 1
        } else {
          alert('No moves');
          return [false,turn,choice]
        }
        turn == 'circle' ? this.setState({turn: 'cross',choice:null,lmoves:[...moves]})
        : this.setState({turn: 'circle',choice:null,rmoves:[...moves]});
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

  copyRoom = (roomId) => {
    navigator.clipboard.writeText(roomId);
    this.setState({show: true});
  }
  render() {
    const { turn , choice, lmoves,rmoves} = this.state;
    const {roomId,playerNum } = this.context;
    return (
      <div className='parent'>
        <p><span>
        {
          playerNum === 1 ? (
            turn === 'circle' ? 'Your Turn (Player 1)' : 'Opponent Turn (Player 2)'
          ) : (
            turn === 'cross' ? 'Your Turn (Player 2)' : 'Opponent Turn (Player 1)'
          )
        }</span>
        </p>
        <p>
          Selection: <span>{ choice === null ? 'None' : turn +' '+(choice+1)}</span>
        </p>
        <div className='roomIdInfo'>
          <button className='btn btn-outline-dark' onClick={() => {this.copyRoom(roomId)}}>Room Id: {roomId}</button>
        </div>

        <Row>
          <Col xs={6}>
            <Toast className='toast' onClose={() => this.setState({show:false})} show={this.state.show} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Notification</strong>
              </Toast.Header>
              <Toast.Body>Room Id copied to clipboard.</Toast.Body>
            </Toast>
          </Col>
        </Row>

        <div className='child'>
            <LeftSideBar makeChoice={this.makeChoice} turn={turn} lmoves={lmoves}/>
            <Board changeTurn={this.changeTurn} changeTurnSocket={this.changeTurnSocket} checkWin={this.props.checkWin} lmoves={lmoves} rmoves={rmoves} />
            <RightSideBar makeChoice={this.makeChoice} turn={turn} rmoves={rmoves}/>
        </div>
      </div>
    )
  }
}

Main.contextType = ResetContext
export default Main