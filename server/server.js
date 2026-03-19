const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const handleChatSocket = require('./sockets/chatSocket');
const authRoutes = require('./routes/authRoutes');
const { client, httpRequestDurationMicroseconds } = require('./metrics');

// Cria objeto para contar usuários conectados
const connections = { count: 0 };

// Cria Gauge para Prometheus
const connectedUsersGauge = new client.Gauge({
  name: 'chat_connected_users',
  help: 'Número de usuários conectados no chat',
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use('/api', authRoutes);

// Endpoint de métricas do Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    console.error('Erro ao gerar métricas:', error);
    res.status(500).end('Erro ao gerar métricas');
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Chat Realtime' });
});

handleChatSocket(io, { connections, connectedUsersGauge });

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});