const express = require('express')
const app = express()
app.use(express.static(__dirname))
const SYSTEM = '系统';
const server = require('http').createServer(app)
const io = require('socket.io')(server)



let userColor = ['#00a1f4', '#0cc', '#f44336', '#795548', '#e91e63', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#607d8b', '#ff9800', '#ff5722'];
function shuffle(arr) {
    let len = arr.length, random;
    while (0 !== len) {
       // 右移位运算符向下取整
        random = (Math.random() * len--) >>> 0; 
       // 解构赋值实现变量互换
        [arr[len], arr[random]] = [arr[random], arr[len]]; 
    }
    return arr;
 }
io.on('connection',socket=>{
  console.log('服务器连接成功')
  let username;
  let color
  socket.on('message', msg => {
      // 如果用户名存在
       if (username) {
           // 就向所有人广播
          console.log(msg)
           io.emit('message', {
                user: msg.username,
                content: msg.value,
                color,
                createAt: new Date().toLocaleString()
            });
       } else {  // 用户名不存在的情况
           // 如果是第一次进入的话，就将输入的内容当做用户名
           username = msg;
           color = shuffle(userColor)[0];
           textright = 'text-align: right;'
           // 向除了自己的所有人广播，毕竟进没进入自己是知道的，没必要跟自己再说一遍
           io.emit('message', {
                user: SYSTEM,
                color,
               content: `${username}加入了聊天！`,
                createAt: new Date().toLocaleString()
           });
        }
  });
})
server.listen(4000)