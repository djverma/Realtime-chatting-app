// Node server to handle socket connections
const io=require('socket.io')(8000)
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);    //socket.broadcast.emit --> broadcasts to everyone(except the newuser) that a new user joined named as name
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message ,name:users[socket.id]});
    })
   socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
   })
})