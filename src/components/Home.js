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
        alert('Someone wins')
        // this.setState({win:true}) 
      }
      // if(cr){ return true }
    }  
  }

  reset = () => {
    this.setState({reset:true},()=>{this.setState({reset:false})})
  }

  render() {
    return (
      <div>
        <ResetProvider value={this.state.reset}>
            <Main checkWin={this.checkWin}/>
        </ResetProvider>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

export default Home