const Message = require('../models/messageModel');
const jwt = require('jsonwebtoken');

const handleChatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Usuário conectado ao chat:', socket.id);

    // Autenticar usuário via token
    socket.on('authenticate', async (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        socket.username = decoded.username;
        console.log(`${socket.username} conectado ao chat`);
        
        // Enviar confirmação de autenticação
        socket.emit('authenticated', {
          success: true,
          username: socket.username
        });
      } catch (error) {
        socket.emit('authenticated', {
          success: false,
          error: 'Token inválido'
        });
      }
    });

    // Entrar em sala
    socket.on('join_room', async (room) => {
      if (!socket.username) {
        socket.emit('error', 'Usuário não autenticado');
        return;
      }

      socket.join(room);
      socket.currentRoom = room;
      console.log(`${socket.username} entrou na sala ${room}`);
      
      // Enviar mensagens recentes da sala
      try {
        const recentMessages = await Message.getRecentMessages(room);
        socket.emit('recent_messages', recentMessages);
      } catch (error) {
        console.error('Erro ao buscar mensagens recentes:', error);
      }
    });

    // Enviar mensagem
    socket.on('chatMessage', async (data) => {
      if (!socket.username) {
        socket.emit('error', 'Usuário não autenticado');
        return;
      }

      const { message } = data;
      const room = socket.currentRoom || 'general';
      
      try {
        // Salvar mensagem no banco
        const savedMessage = await Message.create(
          socket.userId,
          socket.username,
          message,
          room
        );

        // Formatar mensagem para envio
        const messageData = {
          id: savedMessage.id,
          username: socket.username,
          message: message,
          time: savedMessage.created_at,
          room: room
        };

        // Transmitir para todos na sala
        io.to(room).emit('chatMessage', messageData);
        
        console.log(`${socket.username}: ${message} (${room})`);
      } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        socket.emit('error', 'Erro ao enviar mensagem');
      }
    });

    // Desconexão
    socket.on('disconnect', () => {
      if (socket.username) {
        console.log(`${socket.username} desconectado do chat`);
      } else {
        console.log('Usuário desconectado do chat:', socket.id);
      }
    });
  });
};

module.exports = handleChatSocket;
