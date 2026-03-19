import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isAuthenticated = false;
    this.username = null;
    this.listeners = {
      message: [],
      recentMessages: [],
      error: []
    };
  }

  connect(token) {
    if (this.socket) {
      this.disconnect();
    }

    const socketUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://backend:3000';
    this.socket = io(socketUrl);

    // Autenticar com token
    this.socket.emit('authenticate', token);

    return new Promise((resolve, reject) => {
      this.socket.on('authenticated', (data) => {
        if (data.success) {
          this.isAuthenticated = true;
          this.username = data.username;
          resolve(data);
        } else {
          reject(new Error(data.error));
        }
      });

      setTimeout(() => {
        if (!this.isAuthenticated) {
          reject(new Error('Timeout na autenticação'));
        }
      }, 5000);
    });
  }

  joinRoom(room = 'general') {
    if (this.socket && this.isAuthenticated) {
      this.socket.emit('join_room', room);
    }
  }

  sendMessage(message) {
    if (this.socket && this.isAuthenticated) {
      this.socket.emit('chatMessage', { message });
    }
  }

  onMessage(callback) {
    if (this.socket) {
      this.socket.on('chatMessage', callback);
      this.listeners.message.push(callback);
    }
  }

  onRecentMessages(callback) {
    if (this.socket) {
      this.socket.on('recentMessages', callback);
      this.listeners.recentMessages.push(callback);
    }
  }

  onError(callback) {
    if (this.socket) {
      this.socket.on('error', callback);
      this.listeners.error.push(callback);
    }
  }

  removeMessageListener(callback) {
    if (this.socket && callback) {
      this.socket.off('chatMessage', callback);
      this.listeners.message = this.listeners.message.filter(cb => cb !== callback);
    }
  }

  removeRecentMessagesListener(callback) {
    if (this.socket && callback) {
      this.socket.off('recentMessages', callback);
      this.listeners.recentMessages = this.listeners.recentMessages.filter(cb => cb !== callback);
    }
  }

  removeErrorListener(callback) {
    if (this.socket && callback) {
      this.socket.off('error', callback);
      this.listeners.error = this.listeners.error.filter(cb => cb !== callback);
    }
  }

  disconnect() {
    if (this.socket) {
      // Remover todos os listeners
      this.listeners.message.forEach(callback => {
        this.socket.off('chatMessage', callback);
      });
      this.listeners.recentMessages.forEach(callback => {
        this.socket.off('recentMessages', callback);
      });
      this.listeners.error.forEach(callback => {
        this.socket.off('error', callback);
      });
      
      // Limpar arrays de listeners
      this.listeners.message = [];
      this.listeners.recentMessages = [];
      this.listeners.error = [];
      
      this.socket.disconnect();
      this.socket = null;
    }
    this.isAuthenticated = false;
    this.username = null;
  }

  isConnected() {
    return this.socket && this.isAuthenticated;
  }
}

export default new SocketService();
