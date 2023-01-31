const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3001
app.use(cors());


const io = require('socket.io')(PORT, {
    cors: {
        origin: "*",
        methods:["GET","POST","DELETE"],
   } 
})

io.on("connection", socket => {
    console.log(socket.id);
    socket.on('custom', (message,room)=> {
        socket.to(room).emit('receive-message',message);
    })

    socket.on('join-room', (roomId) => {
      if (!io.sockets.adapter.rooms.get(roomId)) {
        socket.emit('room-status',false,0);
      } else {
        if (io.sockets.adapter.rooms.get(roomId).size >= 2) {
          socket.emit('room-status',false,0);
        } else {
          socket.join(roomId);
          socket.emit('room-status',true,io.sockets.adapter.rooms.get(roomId).size);
        }
      }
    })

    socket.on('create-room',(roomId)=>{
      socket.join(roomId);
      socket.emit('room-status',true,io.sockets.adapter.rooms.get(roomId).size);
    })

    socket.on('reset-done',(roomId)=>{
      socket.to(roomId).emit('reset-update');
    })

    socket.on('move-done',({ roomId , elements, board})=>{
      socket.to(roomId).emit('move-update',{elements: elements, board: board});
      console.log(elements, board);
    });
})
