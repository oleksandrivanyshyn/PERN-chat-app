import express from 'express';
const app = express();
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import dotnev from 'dotenv';

dotnev.config();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
