# 💬 Realtime Chat Application

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![SocketIO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)

A **Fullstack Real-Time Chat Application** built to demonstrate modern web development practices including **authentication, WebSockets communication, and real-time message synchronization**.

Users can create accounts, log in, and exchange messages instantly in a shared chat room.

---

# 🚀 Features

- 🔐 User registration and authentication
- ⚡ Real-time messaging using WebSockets
- 👥 Multiple connected users
- 💾 Persistent messages stored in database
- 📡 Instant broadcast to all clients
- 🎨 Simple and responsive interface

---

# 🧰 Technologies

## Backend

Built using:

- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}
- :contentReference[oaicite:3]{index=3}
- :contentReference[oaicite:4]{index=4}

Responsibilities:

- User authentication
- WebSocket message handling
- API endpoints
- Database communication

---

## Frontend

Built using:

- :contentReference[oaicite:5]{index=5}
- :contentReference[oaicite:6]{index=6}

Responsibilities:

- UI rendering
- Authentication flow
- Real-time WebSocket connection
- Message display

---

# ⚙️ Architecture


## 🏗️ Arquitetura

```
chat-realtime/
├── server/          # Backend Node.js
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── sockets/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
└── client/          # Frontend React
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Tecnologias

### Backend (server/)
- Node.js 20+ LTS
- Express 4.18.2
- Socket.IO 4.7.4
- PostgreSQL 18
- JWT
- bcrypt

### Frontend (client/)
- React 18
- Vite 5
- Socket.IO Client 4.7.4

## 📦 Instalação

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## 🔧 Configuração

1. Configure o PostgreSQL em `server/.env`
2. Crie o banco de dados `chat_realtime`
3. Inicie ambos os servidores

## 🌐 Portas

- Backend: http://localhost:3000
- Frontend: http://localhost:5173


