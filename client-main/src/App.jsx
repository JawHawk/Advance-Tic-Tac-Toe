import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { useState,useEffect } from 'react';
import {io} from 'socket.io-client';

const socket = io('https://advance-tictactoe-server.onrender.com/',{secure: true})


function App() {
  const [RoomId, setRoomId] = useState({roomId: null,create: false});
  const [Play, setPlay] = useState(false);
  const [PlayerNum, setPlayerNum] = useState();
  const [connect, setconnect] = useState(false);

  useEffect(()=>{
    socket.on('connect',()=>{
      setconnect(true);
    })
  },[])

  useEffect(() => {
    if(RoomId.roomId){
      RoomId.create ? socket.emit('create-room',RoomId.roomId)
      : socket.emit('join-room',RoomId.roomId);
      socket.once('room-status',(bool,num) => {
        if (!bool) {
          alert("Either Room is full or Room doesn't exist.")
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
          <Landing setRoomId={setRoomId} connect={connect}/>
          <p className='lead'>Made by Chinmay aka Jawhawk</p>
          </> 
          : <Home playerNum={PlayerNum} socket={socket} roomId={RoomId.roomId} />
        }
      </div>
  )
}

export default App
