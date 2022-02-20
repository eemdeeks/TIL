import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app); //http 서버

const wss = new WebSocket.Server({ server }); //ws 서버

wss.on("connection",(socket)=>{
    console.log("conndected to Browser ");
    socket.on("close", () => console.log("Disconnected from the Browser x"));
    socket.on("message",(message) => {
        console.log(message.toString('utf-8'));
    });
    socket.send("hello!");
});

server.listen(3000, handleListen);