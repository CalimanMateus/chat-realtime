# 🛠️ Development Guide

## 📁 **Estrutura de Arquivos**

```
chat-realtime/
├── server/                    # Backend Node.js
│   ├── controllers/           # Lógica de negócio
│   │   └── authController.js  # Login/Register
│   ├── routes/               # Rotas da API
│   │   └── authRoutes.js     # /api/register, /api/login
│   ├── models/               # Models do BD
│   │   ├── userModel.js      # Usuários
│   │   └── messageModel.js   # Mensagens
│   ├── middleware/           # Middlewares
│   │   └── authMiddleware.js # Validação JWT
│   ├── sockets/              # Socket.IO handlers
│   │   └── chatSocket.js     # Lógica do chat
│   ├── config/               # Configurações
│   │   └── database.js       # PostgreSQL pool
│   ├── server.js             # Entry point
│   ├── .env                  # Variáveis ambiente
│   └── package.json          # Dependências
│
└── client/                    # Frontend React
    ├── src/
    │   ├── components/       # Componentes React
    │   │   ├── Message.jsx   # Mensagem individual
    │   │   └── ChatBox.jsx   # Caixa de chat
    │   ├── pages/            # Páginas
    │   │   ├── Login.jsx     # Login
    │   │   ├── Register.jsx  # Registro
    │   │   └── Chat.jsx      # Chat principal
    │   ├── services/         # Serviços
    │   │   ├── api.js        # Axios API
    │   │   └── socket.js     # Socket.IO client
    │   ├── App.jsx           # App principal
    │   ├── main.jsx          # React entry
    │   └── index.css         # Estilos globais
    ├── index.html            # HTML template
    ├── vite.config.js        # Vite config
    ├── tailwind.config.js    # Tailwind config
    └── package.json          # Dependências
```

---

## 🔧 **Como Adicionar Funcionalidades**

### **1. Nova Rota API**

**Passo 1: Criar Controller**
```javascript
// server/controllers/newController.js
const newFeature = async (req, res) => {
  try {
    // Lógica aqui
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**Passo 2: Criar Rota**
```javascript
// server/routes/newRoutes.js
const express = require('express');
const router = express.Router();
const { newFeature } = require('../controllers/newController');

router.post('/feature', newFeature);

module.exports = router;
```

**Passo 3: Adicionar ao server.js**
```javascript
// server/server.js
const newRoutes = require('./routes/newRoutes');
app.use('/api', newRoutes);
```

### **2. Nova Página React**

**Passo 1: Criar Componente**
```javascript
// client/src/pages/NewPage.jsx
import React from 'react';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1 className="text-white">Nova Página</h1>
    </div>
  );
};

export default NewPage;
```

**Passo 2: Adicionar Rota**
```javascript
// client/src/App.jsx
import NewPage from './pages/NewPage';

// Dentro de <Routes>
<Route path="/new" element={<NewPage />} />
```

### **3. Novo Socket Event**

**Passo 1: Client**
```javascript
// client/src/services/socket.js
sendNewData(data) {
  if (this.socket && this.isAuthenticated) {
    this.socket.emit('newEvent', data);
  }
}

onNewData(callback) {
  if (this.socket) {
    this.socket.on('newEvent', callback);
  }
}
```

**Passo 2: Server**
```javascript
// server/sockets/chatSocket.js
socket.on('newEvent', async (data) => {
  // Lógica aqui
  io.emit('newEventResponse', response);
});
```

---

## 🎨 **Customização Design**

### **Cores TailwindCSS**

**Adicionar ao tailwind.config.js:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#06B6D4',
        accent: '#8B5CF6'
      }
    }
  }
}
```

**Usar no componente:**
```jsx
<div className="bg-primary text-white">
  Conteúdo
</div>
```

### **Componentes Reutilizáveis**

**Criar Button.jsx:**
```jsx
// client/src/components/Button.jsx
const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white'
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
```

---

## 🗄️ **Banco de Dados**

### **Nova Tabela**

**SQL:**
```sql
CREATE TABLE new_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Model:**
```javascript
// server/models/newModel.js
const pool = require('../config/database');

class NewModel {
  static async create(name) {
    const query = 'INSERT INTO new_table (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name]);
    return result.rows[0];
  }
}

module.exports = NewModel;
```

---

## 🧪 **Testes**

### **Testar API com curl**
```bash
# Testar registro
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# Testar login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# Testar rota protegida
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer <token>"
```

### **Testar Socket.IO**
```javascript
// No console do navegador
const socket = io('http://localhost:3000');
socket.emit('authenticate', 'seu_token');
socket.emit('chatMessage', { message: 'Teste!' });
socket.on('chatMessage', (data) => console.log(data));
```

---

## 🔍 **Debug**

### **Backend Debug**
```javascript
// Adicionar logs
console.log('Usuario conectado:', socket.id);
console.log('Mensagem recebida:', data);

// Error handling
try {
  // Código
} catch (error) {
  console.error('Erro:', error);
  res.status(500).json({ error: error.message });
}
```

### **Frontend Debug**
```javascript
// React DevTools
// Adicionar console.log
console.log('Estado:', messages);
console.log('Socket conectado:', socketService.isConnected());

// Network tab no navegador
// Verificar requisições API
```

---

## 📦 **Build e Deploy**

### **Frontend Build**
```bash
cd client
npm run build
# Output em dist/
```

### **Backend Produção**
```bash
cd server
npm install --production
NODE_ENV=production node server.js
```

---

## 🔄 **Workflow de Desenvolvimento**

### **1. Iniciar Projeto**
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev

# Terminal 3 - PostgreSQL (se necessário)
psql -U postgres
```

### **2. Fazer Mudanças**
1. Editar código
2. Salvar arquivo
3. Nodemon/Vite recarrega automaticamente
4. Testar no navegador

### **3. Comitar Mudanças**
```bash
git add .
git commit -m "feat: add new feature"
git push
```

---

## 🎯 **Boas Práticas**

### **Código Limpo**
- Nomes descritivos de variáveis
- Funções pequenas e específicas
- Comentários onde necessário
- Consistência no estilo

### **Segurança**
- Validar inputs do usuário
- Usar environment variables
- Hash de senhas com bcrypt
- Tokens JWT com expiração

### **Performance**
- Índices no banco de dados
- Evitar queries N+1
- Lazy loading no frontend
- Cache quando apropriado

---

## 🚀 **Próximos Passos**

1. **Adicionar testes automatizados**
2. **Implementar CI/CD**
3. **Configurar Docker**
4. **Adicionar monitoramento**
5. **Escalabilidade horizontal**

---

## 📞 **Recursos**

- [Node.js Docs](https://nodejs.org/docs/)
- [React Docs](https://react.dev/)
- [Socket.IO Docs](https://socket.io/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
