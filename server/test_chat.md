# Teste do Chat em Tempo Real - Socket.IO

## Fluxo de Conexão

### 1. Conectar ao Socket.IO
```javascript
const socket = io('http://localhost:3000');
```

### 2. Autenticar com Token JWT
```javascript
socket.emit('authenticate', 'SEU_TOKEN_JWT');

socket.on('authenticated', (data) => {
  if (data.success) {
    console.log('Autenticado como:', data.username);
  } else {
    console.error('Falha na autenticação:', data.error);
  }
});
```

### 3. Entrar em Sala
```javascript
socket.emit('join_room', 'general');

socket.on('recent_messages', (messages) => {
  console.log('Mensagens recentes:', messages);
});
```

### 4. Enviar Mensagem
```javascript
socket.emit('chatMessage', {
  message: 'Olá, mundo!'
});
```

### 5. Receber Mensagens
```javascript
socket.on('chatMessage', (data) => {
  console.log(`${data.username}: ${data.message} (${data.time})`);
});
```

## Eventos do Socket.IO

### Cliente → Servidor
- `authenticate` - Envia token JWT para autenticação
- `join_room` - Entra em uma sala específica
- `chatMessage` - Envia mensagem para a sala atual

### Servidor → Cliente
- `authenticated` - Confirmação de autenticação
- `recent_messages` - Mensagens recentes da sala
- `chatMessage` - Nova mensagem recebida
- `error` - Mensagens de erro

## Formato da Mensagem

```json
{
  "id": 123,
  "username": "Mateus",
  "message": "oi",
  "time": "2024-03-16T22:00:00.000Z",
  "room": "general"
}
```

## Exemplo Completo (JavaScript)

```javascript
const socket = io('http://localhost:3000');

// 1. Autenticar
const token = 'SEU_TOKEN_JWT';
socket.emit('authenticate', token);

// 2. Entrar na sala
socket.on('authenticated', (data) => {
  if (data.success) {
    socket.emit('join_room', 'general');
  }
});

// 3. Enviar mensagem
function sendMessage(message) {
  socket.emit('chatMessage', { message });
}

// 4. Receber mensagens
socket.on('chatMessage', (data) => {
  console.log(`${data.username}: ${data.message}`);
});

// 5. Receber mensagens recentes
socket.on('recent_messages', (messages) => {
  messages.forEach(msg => {
    console.log(`${msg.username}: ${msg.message}`);
  });
});
```

## Logs do Servidor

```
Usuário conectado ao chat: abc123
Mateus conectado ao chat
Mateus entrou na sala general
Mateus: oi (general)
Mateus desconectado do chat
```
