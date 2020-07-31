const socket= io('http://localhost:8000');
const form =document.getElementById('send-container');
const messageinput=document.getElementById('messageInp');
const messagecontainer=document.querySelector(".container");
var audio= new Audio('ting.mp3');

function append(message,position)
{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position == 'left')
    {
      audio.play();
    }
}
const name =prompt('Enter your name to join');
socket.emit('new-user-joined',name);
// brodcasting karke yaha par aaya gi
// nicche walaa me ab ye jo kaam karna hai woh ab ye karegaaa
socket.on('user-joined',function(name)
{
  append(`${name} joined the chat`,'right');
})
socket.on('receive',function(data)
{
   append(`${data.name} : ${data.message}`,'left');
})
form.addEventListener('submit',(e)=>
{
  e.preventDefault();
  const message = messageinput.value;
   append(`You : ${message}`,'right');
   socket.emit('send',message);
   messageinput.value='';
})
socket.on(`left`,function(name)
{
  append(`${name} : left the chat`,'right');
})