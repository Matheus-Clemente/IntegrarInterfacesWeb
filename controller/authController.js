const Usuario = require('../model/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await Usuario.create({ nome, email, senha });
    res.status(201).json({ usuario }); // Retorna apenas o usuário, sem token
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// Fazer login e gerar token
exports.entrar = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    // Verifica se o usuário existe e se a senha está correta
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(400).json({ erro: 'Credenciais inválidas.' });
    }

    // Gerar token no login
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, usuario }); // Retorna o token e o usuário
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
