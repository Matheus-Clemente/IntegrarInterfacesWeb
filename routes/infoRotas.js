const express = require('express');
const router = express.Router();
const { criarInfo, obterInfo, atualizarInfo, deletarInfo } = require('../controllers/infoController');
const WithAuth = require('../middleware/authMiddleware');

router.post('/info', WithAuth, criarInfo); 
router.get('/info/:produtoId', obterInfo); 
router.put('/info/:produtoId', WithAuth, atualizarInfo); 
router.delete('/info/:produtoId', WithAuth, deletarInfo); 

module.exports = router;
