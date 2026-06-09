import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import dotnev from 'dotenv';
const PORT = process.env.PORT || 5000;
dotnev.config();
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
