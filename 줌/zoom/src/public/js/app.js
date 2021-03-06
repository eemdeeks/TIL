const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value,roomName, ()=>{
        addMessage(`You: ${value}`);
    });
    input.value = "";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");
    const value = input.value;
    socket.emit("nickname", input.value);
}
function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
    
}

form.addEventListener("submit", handleRoomSubmit);



socket.on("welcome", (user) =>{
    addMessage(`${user} arrived!`);
    
});

socket.on("bye", (left) =>{
    addMessage(`${left} left ㅜㅜ`);
    
});

socket.on("new_message", addMessage );















//socket.io 프레임 워크 사용하지 않고 웹소켓 만으로 프론트앤드 만들기
/* const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`);


function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

//서버와 연결된 경우(브라우져 들어가자마자 발생)
socket.addEventListener("open",()=>{
    console.log("conndected to server o");
});

//서버로부터 메세지를 받았을 경우
socket.addEventListener("message", (message) => { 
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

//연결이 끊겼을 경우
socket.addEventListener("close", () =>{
    console.log("Disconnected from Server x")
});


function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));

    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);


    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname",input.value));
    input.value = ""; //입력하고 입력창 비워주는 것.
}

messageForm.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit",handleNickSubmit); */