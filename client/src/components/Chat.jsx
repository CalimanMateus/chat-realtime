import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './Chat.css'

const socket = io('http://localhost:3000')

function Chat() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('general')

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      socket.off('message')
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && username.trim()) {
      socket.emit('message', {
        message: message.trim(),
        username: username.trim(),
        room: room
      })
      setMessage('')
    }
  }

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit('join_room', room)
    }
  }

  return (
    <div className="chat-container">
      <div className="login-section">
        <input
          type="text"
          placeholder="Seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sala"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Entrar</button>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Chat
