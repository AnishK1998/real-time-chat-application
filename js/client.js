// const socket = io('http://localhost:8000');
const hostname = '0.0.0.0'
const socket = io(`http://localhost:${hostname}`);

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('../media/ting.mp3');
const names = prompt("Enter your name to join the chat")
socket.emit('new-user-joined', names)
const append = (message , position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position === 'left'){
        audio.play()
    }
}
form.addEventListener('submit', (events)=>{
    events.preventDefault()
    const message = messageInput.value
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = ''
})
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    console.log("printing data.name and data.message", data.name, data.message)
    append(`${data.name} :  ${data.message}`, 'left')
})
socket.on('left', data =>{
    append(`${data} has left the chat`, 'right')
})



