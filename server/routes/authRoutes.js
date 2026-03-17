const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Registro de usuário
router.post('/register', AuthController.register);

// Login de usuário
router.post('/login', AuthController.login);

// Rota protegida de exemplo
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const User = require('../models/userModel');
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      message: 'Acesso autorizado',
      user
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
