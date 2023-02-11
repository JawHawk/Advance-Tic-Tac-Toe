import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { useState,useEffect } from 'react';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3001/',{secure: true})
socket.on('connect',()=>{
  console.log('client ID',socket.id);
})

function App() {
  const [RoomId, setRoomId] = useState({roomId: null,create: false});
  const [Play, setPlay] = useState(false);
  const [PlayerNum, setPlayerNum] = useState();

  useEffect(() => {
    if(RoomId.roomId){
      console.log(RoomId.roomId);
      RoomId.create ? socket.emit('create-room',RoomId.roomId)
      : socket.emit('join-room',RoomId.roomId);
      socket.on('room-status',(bool,num) => {
        if (!bool) {
          alert("Either Room is full or Room doesn't exists")
        } else {
          setPlayerNum(num);
          setPlay(true);
        }
      })
    }
  }, [RoomId.roomId])
  
  return (
      <div className="App">
        {
          !Play ? <>
          <Landing setRoomId={setRoomId} />
          <p className='lead'>Made by Chinmay aka Jawhawk</p>
          </> 
          : <Home playerNum={PlayerNum} socket={socket} roomId={RoomId.roomId} />
        }
      </div>
  )
}

export default App
