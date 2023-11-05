//Projeto futuro para quando estiver com mais tempo

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// POST /recipes - Cria uma nova receita
router.post('/', (req, res) => {
  const newRecipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    createdBy: req.user.id // Assumindo que você tem o ID do usuário autenticado disponível
  });

  newRecipe.save()
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET /recipes - Lista todas as receitas
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET /recipes/:id - Obtém uma receita específica pelo ID
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ error: 'Receita não encontrada' }));
});

// PUT /recipes/:id - Atualiza uma receita existente
router.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE /recipes/:id - Deleta uma receita
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Receita deletada com sucesso' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
