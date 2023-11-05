const express = require('express');
const bcrypt = require('bcryptjs'); // para hash de senha
const User = require('../Models/User');
const userController = require('../Controllers/userController');
const router = express.Router();

// POST /users/register - Registro de novo usuário
router.post('/register', userController.createUser);

// POST /users/login - Autenticação do usuário
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Email incorreto.' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    res.json({ message: 'Login bem-sucedido!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id - Atualizar um usuário
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id - Excluir um usuário
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para buscar usuários
router.get('/', async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// GET /users - Obter todos os usuários
router.get('/', userController.getAllUsers);

// GET /users/:id - Obter um usuário por ID
router.get('/:id', userController.getUserById);

module.exports = router;


