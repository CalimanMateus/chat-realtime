import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import socketService from '../services/socket';

const ChatBox = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketListenersRef = useRef([]);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await socketService.connect(token);
          setIsConnected(true);
          
          socketService.joinRoom('general');
          
          // Adicionar listeners e guardar referências
          const messageListener = (message) => {
            setMessages(prev => [...prev, message]);
          };
          const recentMessagesListener = (recentMessages) => {
            setMessages(recentMessages);
          };
          const errorListener = (error) => {
            console.error('Erro no socket:', error);
          };
          
          socketService.onMessage(messageListener);
          socketService.onRecentMessages(recentMessagesListener);
          socketService.onError(errorListener);
          
          // Guardar referências para cleanup
          socketListenersRef.current = [
            messageListener,
            recentMessagesListener,
            errorListener
          ];
        }
      } catch (error) {
        console.error('Erro ao conectar:', error);
        setIsConnected(false);
      }
    };

    connectSocket();

    return () => {
      // Limpar listeners antes de desconectar
      if (socketListenersRef.current.length > 0) {
        socketService.removeMessageListener(socketListenersRef.current[0]);
        socketService.removeRecentMessagesListener(socketListenersRef.current[1]);
        socketService.removeErrorListener(socketListenersRef.current[2]);
        socketListenersRef.current = [];
      }
      socketService.disconnect();
    };
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() && isConnected) {
      socketService.sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '80vh' }}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-black">
              💬 Realtime Chat
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
          {messages.length === 0 ? (
            <div className="text-center mt-20">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma mensagem ainda</h3>
              <p className="text-gray-500">Seja o primeiro a dizer oi! 👋</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  isOwn={message.username === username}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <form onSubmit={sendMessage} className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-50 text-black px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 border border-gray-200 focus:border-purple-500 transition-all duration-200"
              disabled={!isConnected}
            />
            <button
              type="submit"
              disabled={!isConnected || !newMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
