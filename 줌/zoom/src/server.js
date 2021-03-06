import http from "http";
import SocketIo from "socket.io";
import express from "express";
//import { parse } from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));


const httpServer = http.createServer(app); //http 서버
const wsServer = SocketIo(httpServer); //ws 서버

wsServer.on("connection", socket => {

    socket["nickname"] = "Anon";
    socket.onAny((event)=>{
        console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName, done)=> {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname);
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room)=> socket.to(room).emit("bye",socket.nickname));
    });

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
        done();
    });

    socket.on("nickname", (nickname) => (socket["nickname"]= nickname));
    
});


//socket.io 프레임워크 사용하지 않고 웹소켓 사용하여 웹서버 만들기
//const wss = new WebSocket.Server({ server }); //ws 서버

/* const sockets = [];

wss.on("connection",(socket)=>{
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("conndected to Browser ");
    socket.on("close", () => console.log("Disconnected from the Browser x"));
    socket.on("message",(msg) => {
        const message = JSON.parse(msg);

        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload.toString()}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
        
    });
}); */

const handleListen = () => console.log('Listening on http://localhost:3000');
httpServer.listen(3000, handleListen);


