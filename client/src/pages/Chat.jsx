import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import ChatBox from '../components/ChatBox';

const Chat = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!apiService.isAuth()) {
          navigate('/login', { replace: true });
          return;
        }

        const profile = await apiService.getProfile();
        setUsername(profile.user.username);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        apiService.removeToken();
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    apiService.removeToken();
    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="text-purple-700 text-lg font-medium">Carregando...</div>
          <div className="text-gray-600 text-sm mt-2">Conectando ao chat</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ChatBox username={username} />
      
      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-medium text-sm"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Chat;
