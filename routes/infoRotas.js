const express = require('express');
const router = express.Router();
const { criarInfo, obterInfo, atualizarInfo, deletarInfo } = require('../controllers/infoController');
const { protegerRota } = require('../middleware/authMiddleware');

router.post('/info', protegerRota, criarInfo); 
router.get('/info/:produtoId', obterInfo); 
router.put('/info/:produtoId', protegerRota, atualizarInfo); 
router.delete('/info/:produtoId', protegerRota, deletarInfo); 

module.exports = router;
