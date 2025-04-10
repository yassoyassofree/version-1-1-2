const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

io.on("connection", (socket) => {
    console.log("A user connected");
    
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg); // Broadcast to all users
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
