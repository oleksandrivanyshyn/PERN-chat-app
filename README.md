
# PERN Real-Time Chat Application

A full-stack, real-time chat application built using the PERN stack (PostgreSQL, Express, React, Node.js) with TypeScript. The app enables users to securely authenticate, find other users, and chat instantly in real time via WebSockets.

## Features

- **Real-Time Messaging:** Instant message delivery and typing status using Socket.io.
- **Hybrid WebSocket Setup:** Integrated Socket.io server directly alongside the Express server infrastructure.
- **Database & ORM:** PostgreSQL database handling robust relational storage managed via Prisma ORM.
- **State Management:** Light and scalable frontend state management powered by Zustand.
- **Secure Authentication:** JWT token generation stored securely inside HTTP-only cookies.
- **Custom Hooks Architecture:** Modular design utilizing specialized React hooks for authentication, message tracking, and auto-scrolling behaviors.
- **Audio Notifications:** Instant sound effects triggered whenever a new message is received in real-time.
- **Responsive Styling:** Modern, interactive UI built with Tailwind CSS.

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Real-Time:** Socket.io
- **Authentication:** JWT, cookie-parser, bcryptjs

### Frontend
- **Framework:** React.js (Vite + TypeScript)
- **State Management:** Zustand
- **Real-Time client:** Socket.io-client
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database instance

### Environment Variables

Create a `.env` file in your **backend** directory:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000

```

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/oleksandrivanyshyn/pern-chat-app.git
cd pern-chat-app

```


2. **Backend Setup:**
```bash
cd backend
npm install
# Run Prisma migrations to set up your PostgreSQL schema
npx prisma migrate dev --name init
# Start the development server
npm run dev

```


3. **Frontend Setup:**
```bash
cd ../frontend
npm install
# Start the React client
npm run dev

```



## Project Structure Highlights

* `backend/prisma/schema.prisma` - Defines data models for Users and Messages, along with their relational constraints.
* `backend/src/socket/socket.ts` - Core real-time hub tracking connected users and handling live messaging channels.
* `frontend/src/zustand/` - Global state triggers for active conversations and chat layouts.
* `frontend/src/hooks/` - Abstracted UI side-effects handling live connection listening and message parsing.
