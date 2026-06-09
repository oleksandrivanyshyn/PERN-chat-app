import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import { app, server } from './socket/socket.js';
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);

if (existsSync(frontendIndexPath)) {
  app.use(express.static(frontendDistPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
      return next();
    }

    return res.sendFile(frontendIndexPath);
  });
}

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
