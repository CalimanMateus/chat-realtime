# Chat Realtime

Projeto de chat em tempo real com Node.js, React, Socket.IO e PostgreSQL.

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
