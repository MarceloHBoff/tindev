import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Route from './routes';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

mongoose.connect(
  'mongodb+srv://tindev:tindev@tindev-mobsi.mongodb.net/tindev?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  next();
});

app.use(cors());
app.use(express.json());
app.use(Route);

server.listen(3333);
