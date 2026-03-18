# 💬 Realtime Chat Application with full observability (Prometheus, Grafana, Uptime Kuma), WebSockets, authentication, and production-ready monitoring.

## 🧰 Technologies

### Backend
![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-black?logo=express)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-black?logo=socket.io)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue?logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Auth-purple?logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-grey)

### Frontend
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Socket.IO Client](https://img.shields.io/badge/Socket.IO_Client-4.7-black?logo=socket.io)

### Observability
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-orange?logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-Dashboard-orange?logo=grafana)
![Uptime Kuma](https://img.shields.io/badge/Uptime_Kuma-Uptime-green?logo=uptimekuma)

### DevOps
![Docker](https://img.shields.io/badge/Docker-Containers-blue?logo=docker)

A **Fullstack Real-Time Chat Application** built to demonstrate modern web development practices including **authentication, WebSockets communication, and real-time message synchronization**.

Users can create accounts, log in, and exchange messages instantly in a shared chat room.

---

🚀 Features
🔐 User registration and authentication
⚡ Real-time messaging using WebSockets
👥 Multiple connected users
💾 Persistent messages stored in database
📡 Instant broadcast to all clients
🎨 Simple and responsive interface
📊 Monitoramento e Observabilidade

---

## 📊 Monitoramento e Observabilidade

Este projeto foi aprimorado com uma stack de observabilidade completa, simulando um ambiente real de produção.

### 🧠 Stack utilizada

- Prometheus → coleta de métricas
- Grafana → visualização e dashboards
- Uptime Kuma → monitoramento de disponibilidade (uptime)

---

### 📈 Métricas coletadas

- Usuários conectados em tempo real (WebSocket)
- Total de mensagens enviadas
- Taxa de mensagens por minuto
- Métricas HTTP da API
- Tempo de resposta do backend

---

### 🔗 Endpoints

- Métricas Prometheus:
  http://localhost:3000/metrics

- Health Check:
  http://localhost:3000/health

---

### 📊 Dashboards (Grafana)

Exemplos de queries:

- chat_connected_users
- chat_messages_total
- rate(chat_messages_total[1m])

---

### 🟢 Monitoramento (Uptime Kuma)

- Verificação automática da API
- Detecção de falhas em tempo real
- Base para alertas

---

### 🚀 Diferencial

Este projeto não é apenas um chat em tempo real, mas também demonstra práticas modernas de engenharia como:

- Observabilidade
- Monitoramento em tempo real
- Health checks
- Métricas de aplicação

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
├── 📄 README.md
├── 📄 QUICK_START.md
├── 📄 DEVELOPMENT.md
├── 📄 GUIDE.md
├── 📄 test_api.ps1
│
├── 📂 server/
│   ├── 📄 package.json
│   ├── 📄 server.js
│   ├── 📄 .env
│   ├── 📄 metrics.js
│   │
│   ├── 📂 controllers/
│   │   └── 📄 authController.js
│   │
│   ├── 📂 routes/
│   │   └── 📄 authRoutes.js
│   │
│   ├── 📂 sockets/
│   │   └── 📄 chatSocket.js
│   │
│   ├── 📂 models/
│   │   ├── 📄 userModel.js
│   │   └── 📄 messageModel.js
│   │
│   └── 📂 middleware/
│       └── 📄 authMiddleware.js
│
├── 📂 client/
│   ├── 📄 package.json
│   ├── 📄 index.html
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   ├── 📄 vite.config.js
│   │
│   ├── 📂 src/
│   │   ├── 📄 index.css
│   │   ├── 📄 App.jsx
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 Register.jsx
│   │   │   └── 📄 Chat.jsx
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── 📄 ChatBox.jsx
│   │   │   ├── 📄 Message.jsx
│   │   │   └── 📄 ProtectedRoute.jsx
│   │   │
│   │   └── 📂 services/
│   │       ├── 📄 api.js
│   │       └── 📄 socket.js
│   │
│   └── 📂 public/
│       └── 📄 index.html
│
├── 📂 monitoring/
│   └── 📄 prometheus.yml
│
└── 📂 .windsurf/
    └── 📂 workflows/
        └── 📄 metrics.md
```

## 🚀 Tecnologias

🚀 Stack Tecnológica
🔧 Backend

Node.js 20+ (LTS) → Execução do servidor

Express 4.18.2 → API REST

Socket.IO 4.7.4 → Comunicação em tempo real (WebSockets)

PostgreSQL 18 → Banco de dados relacional

JSON Web Token (JWT) → Autenticação stateless

bcrypt → Criptografia de senhas

🎨 Frontend

React 18 → Interface reativa

Vite 5 → Build ultra rápido

Socket.IO Client 4.7.4 → Comunicação com backend

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


