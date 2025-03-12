const Usuario = require('../model/Usuario'); // Importa o modelo de usuário
const jwt = require('jsonwebtoken'); // Importa a biblioteca para geração de tokens JWT
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

// Função para registrar um novo usuário
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body; // Obtém dados do corpo da requisição
    const usuario = await Usuario.create({ nome, email, senha }); // Cria um novo usuário no banco de dados
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Gera um token JWT com validade de 7 dias
    res.status(201).json({ token, usuario }); // Retorna o token e os dados do usuário
  } catch (erro) {
    res.status(400).json({ erro: erro.message }); // Retorna erro caso ocorra algum problema na criação
  }
};

// Função para login de usuário
exports.entrar = async (req, res) => {
  try {
    const { email, senha } = req.body; // Obtém email e senha do corpo da requisição
    const usuario = await Usuario.findOne({ email }); // Busca o usuário pelo email
    if (!usuario || !(await usuario.compararSenha(senha))) { // Verifica se o usuário existe e se a senha está correta
      return res.status(400).json({ erro: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Gera um token JWT válido por 7 dias
    res.json({ token, usuario }); // Retorna o token e os dados do usuário autenticado
  } catch (erro) {
    res.status(500).json({ erro: erro.message }); // Retorna erro em caso de falha no processo
  }
};
