const express = require('express');
const router = express.Router();
const { criarProduto, listarProdutos, atualizarProduto, deletarProduto } = require('../controller/produtoController');
const { protegerRota } = require('../middleware/authMiddleware');

router.post('/produtos', protegerRota, criarProduto);
router.get('/produtos', listarProdutos);
router.put('/produtos/:id', protegerRota, atualizarProduto);
router.delete('/produtos/:id', protegerRota, deletarProduto);

module.exports = router;
