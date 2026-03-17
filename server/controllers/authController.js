const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      // Validação básica
      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Username e password são obrigatórios' 
        });
      }

      // Verificar se usuário já existe
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ 
          error: 'Usuário já existe' 
        });
      }

      // Criptografar senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Criar usuário
      const newUser = await User.create(username, hashedPassword);

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: newUser.id,
          username: newUser.username,
          created_at: newUser.created_at
        }
      });

    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validação básica
      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Username e password são obrigatórios' 
        });
      }

      // Buscar usuário
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          error: 'Usuário ou senha inválidos' 
        });
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Usuário ou senha inválidos' 
        });
      }

      // Gerar JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user.id,
          username: user.username,
          created_at: user.created_at
        }
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }
}

module.exports = AuthController;
