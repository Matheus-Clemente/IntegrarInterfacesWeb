const express = require('express');
const router = express.Router();
const { criarProduto, listarProdutos, atualizarProduto, deletarProduto } = require('../controller/produtoController');
const WithAuth = require('../middleware/authMiddleware');

router.post('/produtos', WithAuth, criarProduto);
router.get('/produtos', WithAuth, listarProdutos);
router.put('/produtos/:id', WithAuth, atualizarProduto);
router.delete('/produtos/:id', WithAuth, deletarProduto);

module.exports = router;
