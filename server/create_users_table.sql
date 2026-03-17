-- Criar tabela de usuários para o sistema de autenticação
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para melhor performance na busca por username
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Inserir usuário de teste (opcional)
-- INSERT INTO users (username, password) 
-- VALUES ('admin', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjOzJqQ');

-- Verificar tabela criada
SELECT * FROM users LIMIT 1;
