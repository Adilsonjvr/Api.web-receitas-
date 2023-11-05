const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const userController = {
  // Função para listar todos os usuários
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Função para criar um novo usuário
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Verificação de campos obrigatórios
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    // Verificação de e-mail único
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está em uso.' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criação do usuário
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: 'Falha ao criar usuário.', error: err.message });
    }
  },

  // Função para autenticar um usuário
loginUser: async (req, res) => {
  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com a senha hash armazenada
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Usuário autenticado com sucesso
    res.json({ message: 'Login bem-sucedido!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
},

    // Função para encontrar um usuário pelo ID
    getUserById: async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        if (user == null) {
          return res.status(404).json({ message: 'Não foi possível encontrar o usuário' });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
};

module.exports = userController;
