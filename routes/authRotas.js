const express = require('express');
const router = express.Router();
const { registrar, entrar } = require('../controllers/authController');

router.post('/registrar', registrar);
router.post('/entrar', entrar);

module.exports = router;