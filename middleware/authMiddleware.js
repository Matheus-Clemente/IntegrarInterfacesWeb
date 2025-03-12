// Importa a biblioteca jsonwebtoken para manipulação de tokens JWT
const jwt = require('jsonwebtoken');

exports.protegerRota = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição (Authorization)
  const token = req.headers.authorization;
  
  // Se não houver um token, retorna erro 401 (não autorizado)
  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Remove a palavra "Bearer " do token e verifica sua autenticidade
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    
    // Se o token for válido, adiciona o ID do usuário decodificado no objeto da requisição
    req.usuarioId = decoded.id;

    // Passa a execução para o próximo middleware ou rota
    next();
  } catch (erro) {
    // Se houver erro na verificação do token, retorna erro 401 (token inválido)
    res.status(401).json({ erro: 'Token inválido.' });
  }
};
