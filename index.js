const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(morgan('combined'));

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Rota inicial para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Rotas
const userRoutes = require('./Routes/userRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

// Habilitar CORS para todas as rotas
app.use(cors());

// Middleware para Rotas Não Encontradas
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Middleware de Tratamento de Erros
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
