const io= require('socket.io')(8000);

const users={}; //maine ek empty object banayaa hai

io.on('connection',function make(socket)
{
    socket.on('new-user-joined',function(name)
    {
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',function(message)
    {
        socket.broadcast.emit('receive',{message : message,name: users[socket.id]});
    });
    socket.on(`disconnect`,function(messsage)
    {
       socket.broadcast.emit(`left`,users[socket.id]);
       delete users[socket.id];
    })
})
