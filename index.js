const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
// https://drawing-tool-server.onrender.com
const URL = app.settings.env === 'development' ? 'http://localhost:3000' : 'https://drawing-tool-kappa.vercel.app/';
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
});

httpServer.listen(5000);