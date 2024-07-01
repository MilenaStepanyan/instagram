import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import http from "http"
import { Server } from 'socket.io';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoutes.js';
import followerRoutes from './routes/followerRoute.js';
import chatRouter from './routes/chatRoute.js';
import { verifyToken } from './middlewares/authMiddleware.js';
import pool from './lib/db.js';
const app = express();
const PORT = 3018;
const UPLOADS_DIR = path.resolve('uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/post', verifyToken, postRouter);
app.use('/api/user', followerRoutes);
app.use('/api/', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST'],
  },
});

const users = {};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('join', async (username) => {
    if (username) {
      users[username] = socket.id;
      console.log(`${username} joined with socket ID ${socket.id}`);
      

      try {
        const [undeliveredMessages] = await pool.execute(
          'SELECT * FROM Messages WHERE recipient = ? AND delivered = 0',
          [username]
        );
        undeliveredMessages.forEach(async (message) => {
          io.to(socket.id).emit('receive_message', message);
          await pool.execute(
            'UPDATE Messages SET delivered = 1 WHERE id = ?',
            [message.id]
          );
        });
      } catch (error) {
        console.error('Error fetching undelivered messages:', error);
      }
    }
  });

  socket.on('send_message', async (data) => {
    const { recipient, message, author, time } = data;
    const recipientSocketId = users[recipient];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive_message', { author, message, time });
    }
    try {
      await pool.execute(
        "INSERT INTO Messages (author, recipient, message, time, delivered) VALUES (?, ?, ?, ?, ?)",
        [author, recipient, message, time, recipientSocketId ? 1 : 0]
      );
    } catch (error) {
      console.error('Error storing message:', error);
    }
  });

  socket.on('disconnect', () => {
    for (let username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        break;
      }
    }
    console.log('user disconnected');
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});