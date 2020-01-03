var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const chatroom = {
  members: [],
  message: []
}
app.use(express.static('public'))

server.listen(3000,function(){
  console.log('请访问127.0.0.1:3000')
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('客户端已连接')  
  // socket.emit('news', { hello: 'world' });
  socket.on('newmember', function (data) {
    chatroom.members.push(data.member)
    socket.emit('getmember', chatroom.members)
  });

  socket.on('message', function(data){
    chatroom.message.push(data)
    socket.emit('getmessage', chatroom.message)
  })

  setInterval(() => {
    socket.emit('getmember', chatroom.members)
    socket.emit('getmessage', chatroom.message)
  },500)
});