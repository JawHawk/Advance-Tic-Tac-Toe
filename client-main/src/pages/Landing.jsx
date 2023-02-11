import React, { useEffect } from 'react'
import { useState } from 'react'
import Fade from 'react-bootstrap/Fade';

 
export default function Landing({setRoomId}) {
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [room, setroom] = useState(null)
  function createRoom(){
    setRoomId(
      {roomId:String(Math.floor(Math.random()*10000000)), create: true}
    );
  }

  return (
    <div className='d-flex flex-column justify-content-center gap-5' style={{height: '75vh'}}>
        <p className='display-1 '>Advance Tic Tac Toe</p>
        <div className='d-flex justify-content-center gap-5'>
            <button type="button" onClick={()=> setcollapseOpen(!collapseOpen)} className="btn btn-dark btn-lg p-3" aria-controls="collapse"
                aria-expanded={collapseOpen}>Join Room</button>
            <button type="button" onClick={createRoom} className="btn p-3 btn-lg btn-dark ">Create Room</button>
            <button type="button" onClick={()=>{alert("Hii there, this is advance Tic-Tac-Toe where X's & O's are of 4 sizes. Each greater size can overlap its smaller size & moves are limited. Rest rules are same, but its more fun !!! Circle starts first here ...")}} 
                className="btn p-3 btn-lg btn-dark">Rules</button>
        </div>
        <Fade in={collapseOpen}>
          <div id="collapse">
            <div className='d-flex justify-content-center gap-3' style={{alignItems:'center'}}>
              <form>
              <div className="form-group">
                <input type="room-id" onChange={(e)=>{setroom(e.target.value)}} className="form-control" id="RoomIdInput" placeholder="Enter Room Id" />
              </div>
              </form>
              <button type="submit" onClick={()=>{setRoomId({roomId: room, create: false})}} className="btn btn-dark">
                Submit
              </button>
            </div>
          </div>
        </Fade>
    </div>
  )
}
