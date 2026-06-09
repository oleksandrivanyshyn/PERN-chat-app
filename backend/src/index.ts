import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import dotnev from 'dotenv';
import { app, server } from './socket/socket.js';
const PORT = process.env.PORT || 5000;
dotnev.config();
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);
server.listen(PORT, () => console.log('Server started on port 5000'));
