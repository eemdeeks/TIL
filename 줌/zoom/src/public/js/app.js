const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form");

function backendDone(msg){
    console.log(`The backend says:`, msg);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, backendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);





















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