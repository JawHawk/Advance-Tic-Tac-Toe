import React, { Component } from 'react'
import Main from './Main'
import { ResetProvider } from './resetContext'

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      reset:false
    }
  }
  componentDidMount(){
    alert("Hii there, this is advance Tic-Tac-Toe where X's & O's are of 4 sizes. Each greater size can overlap its smaller size & moves are limited. Rest rules are same, but its more fun !!! Circle starts first here ...")
  }
  checkWin = (board) => {
    console.log('checkwin ran');
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
          alert('Cross Wins. Noob circle user -_- ')
        }
      }
    }  
  }

  reset = () => {
    this.setState({reset:true},()=>{this.setState({reset:false})})
  }

  render() {
    const btnStyle = {background:'lightblue',
          cursor:'pointer',
          padding:'10px',
          border:'1px solid black',
          borderRadius:'10px'}
    return (
      <div>
        <ResetProvider value={this.state.reset}>
            <Main checkWin={this.checkWin}/>
        </ResetProvider>
        <button style={btnStyle} onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

export default Home