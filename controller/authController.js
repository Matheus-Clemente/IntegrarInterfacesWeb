const Usuario = require('../model/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await Usuario.create({ nome, email, senha });
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, usuario });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.entrar = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(400).json({ erro: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, usuario });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
