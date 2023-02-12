import React, { Component } from 'react'
import Main from '../components/Main'
import { ResetProvider } from './resetContext'

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      reset:false
    }
  }
  checkWin = (elements) => {
    const board = elements.map(el => {
      if (el.status === 'circle'){
        return 'circle'
      } else if (el.status === 'cross'){
        return 'cross'
      } else {
        return null
      }
    })
    const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    const circle = board.reduce((total,el,ind)=>{
        if (el === 'circle') { total.push(ind) } 
        return total
    },[])
    const cross = board.reduce((total,el,ind)=>{
        if (el === 'cross') { total.push(ind) } 
        return total
    },[])

    for(const j of winConditions){
      var cc = true;
      var cr = true;
      for(let i = 0;i<j.length;i++){
        if(circle.indexOf(j[i]) === -1) { cc = false }
        if(cross.indexOf(j[i]) === -1) { cr = false }
      }
      if(cc || cr){ 
        if(cc){
          alert('Circle Wins. Noob cross user -_- ');
        } else {
          alert('Cross Wins. Noob circle user -_- ');
        }
      }
    }  
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.on('reset-update',()=> {
      this.setState({reset:true},()=>{this.setState({reset:false})})
    })
  }

  reset = () => {
    const {socket,roomId} = this.props;
    socket.emit('reset-done',roomId);
    this.setState({reset:true},()=>{this.setState({reset:false})})
  }

  render() {
    return (
      <>
        <ResetProvider value={{reset: this.state.reset,
          playerNum: this.props.playerNum,
          socket: this.props.socket ,
          roomId : this.props.roomId }}>

            <Main checkWin={this.checkWin} />

        </ResetProvider>
        <button className="btn btn-outline-dark px-3 py-2" onClick={this.reset}>Reset Board</button>
      </>
    )
  }
}

export default Home