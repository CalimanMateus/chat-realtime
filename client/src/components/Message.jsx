import React from 'react';

const Message = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
        isOwn 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-100 text-black border border-gray-200'
      }`}>
        {!isOwn && (
          <div className="font-bold text-sm mb-1 text-gray-800">
            {message.username}
          </div>
        )}
        <div className="text-sm leading-relaxed break-words">
          {message.message}
        </div>
        <div className={`text-xs mt-1 ${
          isOwn ? 'text-purple-100' : 'text-gray-500'
        }`}>
          {formatTime(message.time)}
        </div>
      </div>
    </div>
  );
};

export default Message;
