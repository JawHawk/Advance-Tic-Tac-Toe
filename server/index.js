const express = require('express');
const app = express();
const cors = require('cors');
const { createServer } = require("http");
const httpServer = createServer(app);
const { Server } = require("socket.io");
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET","POST","DELETE"]
  }
});

io.on("connection", socket => {
    console.log(socket.id);
    socket.on('custom', (message,room)=> {
        socket.to(room).emit('receive-message',message);
    }) }) 
    
 io.on("connection", socket => {
  
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

    socket.on('play-move',(roomId) => {
      var bool;
      io.sockets.adapter.rooms.get(roomId).size == 2 ? bool = true : bool = false;
      socket.emit('play',bool);
    })

    socket.on('move-done',({ roomId , elements, board})=>{
      socket.to(roomId).emit('move-update',{elements: elements, board: board});
    });
})

httpServer.listen(3001);