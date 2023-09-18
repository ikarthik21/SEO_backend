import dotenv from 'dotenv';
import { Server } from 'socket.io'
dotenv.config();
import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    },
});


 
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
});


app.get('/pingscript', (req, res) => {
    const { id } = req.query;
    io.emit("id_receive", id);
    return res.status(200).json({ message: "ID has been sent" });
})



server.listen(port, () => {
    console.log("SERVER IS RUNNING", port);
});
