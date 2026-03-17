# ⚡ Quick Start - Chat Realtime

## 🚀 **Iniciar em 5 Minutos**

### **1. Clonar/Entrar na Pasta**
```bash
cd chat-realtime
```

### **2. Backend**
```bash
cd server
npm install
npm run dev
```
**✅ Backend rodando em:** http://localhost:3000

### **3. Frontend** (em outro terminal)
```bash
cd client  
npm install
npm run dev
```
**✅ Frontend rodando em:** http://localhost:5173

### **4. Acessar o Chat**
1. Abra: http://localhost:5173
2. Crie uma conta em `/register`
3. Faça login em `/login`
4. Comece a conversar em `/chat`

---

## 🔧 **Configuração Rápida**

### **PostgreSQL**
```bash
# Criar banco
psql -U postgres -c "CREATE DATABASE chat_realtime;"

# Configurar .env (server/.env)
DB_PASSWORD=postgres
```

---

## 📱 **Teste Imediato**

### **Registrar Usuário**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'
```

### **Fazer Login**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'
```

---

## 🎯 **Features Prontas**

- ✅ **Registro/Login** com JWT
- ✅ **Chat em tempo real** com Socket.IO
- ✅ **Persistência** no PostgreSQL
- ✅ **Interface moderna** com TailwindCSS
- ✅ **Design responsivo**

---

## 🐛 **Problemas?**

**Porta 3000 ocupada?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Erro PostgreSQL?**
```bash
# Verificar se está rodando
psql -U postgres -l
```

**Frontend não carrega?**
```bash
# Limpar e reinstalar
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🌐 **Acesso Rápido**

- **Chat**: http://localhost:5173/chat
- **Login**: http://localhost:5173/login  
- **Register**: http://localhost:5173/register
- **API**: http://localhost:3000/api

---

## 🎉 **Pronto!**

Seu chat em tempo real está funcionando! 🚀

Para mais detalhes, veja `GUIDE.md`
