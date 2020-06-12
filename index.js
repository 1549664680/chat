let socket = io()
socket.on('connect',()=>{
  console.log('连接成功')
})
let username
while(!username){
  username=prompt("请输入用户名");
}
socket.emit('message',username);

let list = document.getElementById('list'),
    input = document.getElementById('input'),
    sendBtn = document.getElementById('sendBtn')
function send(){
  let value = input.value;
  if(value){
    let date = {
      value,
      username
    }
    socket.emit('message',date);
    input.value = ''
  }else{
    alert('输入不能为空')
  }
}
function enterSend(event){
  let code = event.keyCode;
  if(code === 13){
    send()
  }
}
sendBtn.onclick= send
input.onkeypress = function(event){
  enterSend(event)
}

 function privateChat(event) {
    let target = event.target;
       // 拿到对应的用户名
    let user = target.innerHTML;
       // 只有class为user的才是目标元素
    if (target.className === 'user') {
           // 将@用户名显示在input输入框中
        input.value = `@${user} `;
    }
 }
    // 点击进行私聊
 list.onclick = function(event) {
    privateChat(event);
 };


socket.on('message',data=>{
  let li = document.createElement('li');
  let textright = ' '
  if(data.user == username){
    console.log('text-align: right;')
    textright = 'text-align: right;'
  }
  li.className='list-group-item';
  li.style="display:flex;"
  li.innerHTML = `
    <div style="${textright};width:100%">
    <p style="color: #ccc; ">
    <span class="user" style="color:${data.color} ">${data.user}</span>
    ${data.createAt}
    </p>
    <p class="content" style="background:${data.color};">${data.content}</p>
    </div>
  `
  list.appendChild(li)
  list.scrollTop = list.scrollHeight
})