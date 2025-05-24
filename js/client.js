// const socket = io('http://localhost:8080');

// const form = document.getElementById('send-container'); 
// const messageInput = document.getElementById('messageInp') 
// const messageContainer = document.querySelector(".container")
// var audio = new Audio('ding.mp3');

// const append = (message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText= message;
//     messageElement.classList.add('message'); 
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//     if(position =='left'){
//         audio.play();
//     }
// }


// form.addEventListener('submit', (e)=>{
// e.preventDefault();
// const message = messageInput.value; 
// append(`You: ${message}`, 'right')
// socket.emit('send', message); 
// messageInput.value = ''
// })

// const user_name = prompt ("Enter your name to join");
// socket.emit('new-user-joined', user_name);

// socket.on('user-joined', user_name =>{
// append(`${user_name} joined the chat`, 'right') 
// })


// socket.on('receive', data =>{
// append(`${data.user_name}:${data.message}`, 'left')
// })

// socket.on('left', data =>{
// append(`${user_name} left the chat`, 'left')
// })

// Connect to server
const socket = io('http://localhost:8080');

// DOM Elements
const form = document.getElementById('send-container'); 
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const emojiBtn = document.getElementById('emoji-btn');


// Notification sound
var audio = new Audio('ding.mp3');
audio.play();


// Append messages
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message; 
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    // if (position === 'left') {
    //     audio.play();
    // }
};

// Send message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        append(`<strong>You:</strong> ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    }
});

// Prompt for name
const user_name = prompt("Enter your name to join");
socket.emit('new-user-joined', user_name);

// Receive messages
socket.on('user-joined', name => {
    append(`<em>${name} joined the chat</em>`, 'right');
});

socket.on('receive', data => {
    append(`<strong>${data.user_name}:</strong> ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`<em>${name} left the chat</em>`, 'left');
});

