//this index.js file is for node server
// const io = require('socket.io')(8000);
const hostname = '0.0.0.0'
const io = require('socket.io')(hostname);
const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        console.log("new user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message , name : users[socket.id]})
    })
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
})


