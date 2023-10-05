const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
// https://drawing-tool-server.onrender.com
const URL = app.settings.env === 'development' ? 'http://localhost:3000' : 'https://drawing-tool-kappa.vercel.app/';
// const URL = 'https://drawing-tool-kappa.vercel.app/';
app.use(cors({ origin: URL }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
    console.log("Server connected")

    socket.on('beginPath', (arg) => {
        socket.broadcast.emit('beginPath', arg);
    })

    socket.on('drawLine', (arg) => {
        socket.broadcast.emit('drawLine', arg);
    })

    socket.on('changeConfig', (arg) => {
        socket.broadcast.emit('changeConfig', arg);
    })

    socket.on("menuItem", (arg) =>{
        socket.broadcast.emit('menuItem', arg);
    })

    socket.on("undo_redo", (arg) => {
        socket.broadcast.emit('undo_redo', arg);
    })

    socket.on("historySync", (arg) => {
        console.log("HISTORY ", arg)
        socket.broadcast.emit('historySync', arg);
    })
});

httpServer.listen(5000);