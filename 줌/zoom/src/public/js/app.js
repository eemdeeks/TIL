const socket = new WebSocket(`ws://${window.location.host}`);

//서버와 연결된 경우(브라우져 들어가자마자 발생)
socket.addEventListener("open",()=>{
    console.log("conndected to server o");
});

//서버로부터 메세지를 받았을 경우
socket.addEventListener("message", (message) => { 
    console.log("just got this: ", message, "from the server");
});

//연결이 끊겼을 경우
socket.addEventListener("close", () =>{
    console.log("Disconnected from Server x")
});


//10초 뒤에 메시지 보내기
setTimeout(() => {
    socket.send("hello from the browser!");
},10000);