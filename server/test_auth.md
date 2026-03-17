# Teste de Autenticação - Exemplos com curl

## Registrar Novo Usuário

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "123456"
  }'
```

**Resposta esperada:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "username": "joao",
    "created_at": "2024-03-16T21:48:00.000Z"
  }
}
```

## Fazer Login

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "123456"
  }'
```

**Resposta esperada:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "joao",
    "created_at": "2024-03-16T21:48:00.000Z"
  }
}
```

## Acessar Rota Protegida

```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta esperada:**
```json
{
  "message": "Acesso autorizado",
  "user": {
    "id": 1,
    "username": "joao",
    "created_at": "2024-03-16T21:48:00.000Z"
  }
}
```

## Testar Erros

### Usuário já existe
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "outrasenha"
  }'
```

### Senha incorreta
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "senhaerrada"
  }'
```

### Token inválido
```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer token_invalido"
```
